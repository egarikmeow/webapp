import asyncio
from aiogram import Bot, Dispatcher
from aiogram.types import Message, WebAppInfo
from aiogram.filters import CommandStart, Command
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.client.bot import DefaultBotProperties  # <- важно

TOKEN = "8241511485:AAFNHhwuT0taRuvTFNaql5YPksC0G6hOgvM"

# Используем DefaultBotProperties для parse_mode
bot = Bot(
    token=TOKEN,
    default=DefaultBotProperties(parse_mode="HTML")
)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    kb = InlineKeyboardBuilder()
    kb.button(
        text="💖 Нажми сюда",
        web_app=WebAppInfo(url="https://egarikmeow.github.io/webapp/webapp/?v=18")
    )

    await message.answer(
        "<b>👋 Привет, Яночка!\n\n😼 Думаю, этого бота ты увидишь 14 февраля, ровно в день всех влюбленных, сделал я его по этому случаю\n\n💘 ЖМИ КНОПКУ НИЖЕ - ТАМ САМОЕ ОСНОВНОЕ!!! Можешь тыкать всё, что видишь - это будет даже очень хорошо. Для подробностей пропиши /info</b>",
        reply_markup=kb.as_markup()
    )

@dp.message(Command("info"))
async def info(message: Message):
    text = (
        "<i><b>‼️ Информация:</b></i>\n\n"
        "<b>❤️ Самую главную информацию ты увидишь в мини-аппе (/start) - там всё подробно. "
        "Здесь лишь расскажу, что я вложил всю душу сюда, самую малую часть идей (иначе было бы слишком много), "
        "выжал максимум своих сил. Оч надеюсь, что тебе это все понравится.</b>\n\n"
        "‼️‼️‼️ Дальше некоторые спойлеры, не читай, если не хочешь спойлеров!\n\n"
        "<tg-spoiler>Баг, который невозможно исправить (я пытался): кнопка \"назад\" в лотереи не отображается, "
        "так что либо перезагрузи страницу, либо тыкни туда, где она была в режиме \"причины\" или \"викторина\" "
        "(она там есть, но не отображается, кликабельна!)</tg-spoiler>"
    )
    await message.answer(text)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
