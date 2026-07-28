#!/bin/bash

# Скрипт запуска MedoEDUz

echo "🐻 MedoEDUz - Медоеду ВСЁ!"
echo "================================"
echo ""

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js не установлен. Используем Python..."

    # Проверка Python
    if command -v python3 &> /dev/null; then
        echo "✅ Запуск с Python 3..."
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        echo "✅ Запуск с Python..."
        python -m http.server 8000
    else
        echo "❌ Ни Node.js, ни Python не найдены!"
        echo "Установите один из них для запуска сервера."
        exit 1
    fi
else
    echo "✅ Node.js найден"

    # Проверка package.json
    if [ ! -f "package.json" ]; then
        echo "⚠️  package.json не найден. Создаём базовую версию..."
        cat > package.json << 'EOF'
{
  "name": "medoeduz",
  "version": "1.0.0",
  "scripts": {
    "start": "python -m http.server 8000"
  }
}
EOF
    fi

    # Проверка установленных зависимостей
    if [ ! -d "node_modules" ]; then
        echo "📦 Установка зависимостей..."
        npm install
    fi

    echo "🚀 Запуск сервера разработки..."
    npm start
fi

echo ""
echo "================================"
echo "🌐 Сервер запущен на http://localhost:8000"
echo "Нажмите Ctrl+C для остановки"
echo "================================"
