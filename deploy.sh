#!/bin/bash
# Deploy cultivee.com.br para VPS
# Uso: bash deploy.sh

set -e

VPS_HOST="129.121.50.168"
VPS_PORT="22022"
VPS_USER="root"
SSH_KEY="D:/01-projetos-claude/.credentials/id_rsa"
REMOTE_DIR="/opt/sites/cultivee.com.br"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

SSH_CMD="ssh -i $SSH_KEY -p $VPS_PORT $VPS_USER@$VPS_HOST"
SCP_CMD="scp -i $SSH_KEY -P $VPS_PORT"

echo "=== Deploy cultivee.com.br ==="

# Garantir diretorio remoto
$SSH_CMD "mkdir -p $REMOTE_DIR"

# Enviar docker-compose.yml
echo "-> Enviando docker-compose.yml..."
$SCP_CMD "$PROJECT_DIR/docker-compose.yml" "$VPS_USER@$VPS_HOST:$REMOTE_DIR/docker-compose.yml"

# Empacotar e enviar site (excluindo node_modules e dist)
echo "-> Empacotando site..."
cd "$PROJECT_DIR"
tar czf /tmp/cultivee-site.tar.gz \
    --exclude='node_modules/' \
    --exclude='dist/' \
    --exclude='.git/' \
    --exclude='01-imagens/' \
    .

echo "-> Enviando para VPS..."
$SCP_CMD /tmp/cultivee-site.tar.gz "$VPS_USER@$VPS_HOST:/tmp/"
$SSH_CMD "cd $REMOTE_DIR && tar xzf /tmp/cultivee-site.tar.gz && rm /tmp/cultivee-site.tar.gz"

# Rebuild container
echo "-> Reconstruindo container..."
$SSH_CMD "cd $REMOTE_DIR && docker compose build --no-cache && docker compose up -d"

# Verificar saude
echo "-> Verificando saude..."
sleep 3
$SSH_CMD "docker ps --format 'table {{.Names}}\t{{.Status}}' | grep cultivee-site"

echo ""
echo "=== Deploy concluido! ==="
