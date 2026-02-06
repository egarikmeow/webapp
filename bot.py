import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message, WebAppInfo
from aiogram.filters import CommandStart
from aiogram.utils.keyboard import InlineKeyboardBuilder

TOKEN = "8241511485:AAFNHhwuT0taRuvTFNaql5YPksC0G6hOgvM"

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    kb = InlineKeyboardBuilder()
    kb.button(
        text="💖 Почему я тебя люблю",
        web_app=WebAppInfo(url="https://egarikmeow.github.io/webapp/webapp/?v=13")
    )

    await message.answer(
        "Я сделал для тебя кое-что особенное ❤️",
        reply_markup=kb.as_markup()
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
