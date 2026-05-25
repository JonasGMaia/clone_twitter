#!/usr/bin/env bash
# Sair em caso de erro
set -o errexit

# Instalar dependências
poetry install

# Recolher ficheiros estáticos
poetry run python manage.py collectstatic --no-input

# Aplicar migrações ao banco de dados
poetry run python manage.py migrate