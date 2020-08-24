import * as fs from 'fs'
import { TelegrafContext } from 'telegraf/typings/context'
import mf from './md_friendly'

enum Degrees {
    incorrect,
    minus30,
    minus20,
    minus15,
    minus10
}

enum CountRange {
    incorrect,
    below100,
    above100,
    above300,
    above500,
    above1000,
    above4000
}

enum PayWay {
    incorrect,
    cash,
    cashless
}

enum Delivery {
    incorrect,
    with,
    without
}

interface User {
    id: number,
    form: {
        contact: string,
        degrees: Degrees
        countRange: CountRange
        delivery: Delivery,
        payWay: PayWay
    }
}

const checkDegrees = (value: string): Degrees => {
    if (value == '-30') return Degrees.minus30
    else if (value == '-20') return Degrees.minus20
    else if (value == '-15') return Degrees.minus15
    else if (value == '-10') return Degrees.minus10
    else return Degrees.incorrect
}

const checkCountRange = (value: string): CountRange => {
    value = value.toLowerCase()
    if (value == 'до 100') return CountRange.below100
    else if (value == 'от 100') return CountRange.above100
    else if (value == 'от 300') return CountRange.above300
    else if (value == 'от 500') return CountRange.above500
    else if (value == 'от 1000') return CountRange.above1000
    else if (value == 'от 4000') return CountRange.above4000
    else return CountRange.incorrect
}

const checkDelivery = (value: string): Delivery => {
    value = value.toLowerCase()
    if (value.includes('да')) return Delivery.with
    else if (value.includes('нет')) return Delivery.without
    else return Delivery.incorrect
}

const checkPayWay = (value: string): PayWay => {
    value = value.toLowerCase()
    if (value.includes('безнал')) return PayWay.cashless
    else if (value.includes('нал')) return PayWay.cash
    else return PayWay.incorrect
}

const getUser = (id: number): User => {
    try {
        return JSON.parse(fs.readFileSync('users/' + id, 'utf8'))
    } catch (e) {
        return null
    }
}
const saveUser = (user: User): void => fs.writeFileSync('users/' + user.id, JSON.stringify(user))
const deleteUser = (id: number): void => fs.unlinkSync('users/' + id)

const readDegrees = (degrees: Degrees): string => {
    if (degrees == Degrees.minus30) return '-30'
    else if (degrees == Degrees.minus20) return '-20'
    else if (degrees == Degrees.minus15) return '-15'
    else if (degrees == Degrees.minus10) return '-10'
}

const readCountRange = (countRange: CountRange): string => {
    if (countRange == CountRange.below100) return 'До 100'
    else if (countRange == CountRange.above100) return 'От 100'
    else if (countRange == CountRange.above300) return 'От 300'
    else if (countRange == CountRange.above500) return 'От 500'
    else if (countRange == CountRange.above1000) return 'От 1000'
    else if (countRange == CountRange.above4000) return 'От 4000'
}

const readDelivery = (delivery: Delivery): string => {
    if (delivery == Delivery.with) return 'требуется'
    else if (delivery == Delivery.without) return 'не требуется'
}

const readPayWay = (payWay: PayWay): string => {
    if (payWay == PayWay.cash) return 'наличными'
    else if (payWay == PayWay.cashless) return 'безначиный'
}

const generateRequestText = (user: User): string => {
    let text =
        '[Пользователь](tg://user?id=' + user.id + ')\n';
    text += mf(
        'Имя, номер: ' + user.form.contact + '\n' +
        'Градус: ' + readDegrees(user.form.degrees) + '\n' +
        'Количество: ' + readCountRange(user.form.countRange) + '\n' +
        'Доставка: ' + readDelivery(user.form.delivery) + '\n' +
        'Метод оплаты: ' + readPayWay(user.form.payWay)
    )
    return text
}

export default async (ctx: TelegrafContext) => {
    if (!ctx.message.text) {
        let replyText =
            '❌ Я не понял вас'
        ctx.reply(replyText)
        return
    }

    let user = getUser(ctx.from.id)
    if (!user) {
        saveUser({
            id: ctx.from.id,
            form: {
                contact: null,
                degrees: null,
                countRange: null,
                delivery: null,
                payWay: null
            }
        })
        let replyText =
            '👋 Приветствую, Вы находитесь на боте сайта незамерзайка.москва\n' +
            'Для быстрого заказа ответьте на несколько вопросов. Обычно это занимает меньше минуты!'
        ctx.reply(replyText, {
            reply_markup: {
                keyboard: [
                   [ { text: '👉 Приступить' } ]
                ],
                resize_keyboard: true                     
            }
        })
        return
    }

    if (user.form.contact == null && ctx.message.text.includes('Приступить')) {
        let replyText =
            '1/5. Какой градус незамерзайки вас интересует?'
        ctx.reply(replyText, {
            reply_markup: {
                keyboard: [
                    [ { text: '-30' }, { text: '-20' } ],
                    [ { text: '-15' }, { text: '-10' } ]
                ],
                resize_keyboard: true
            }
        })
    } else if (user.form.degrees == null) {
        let degrees = checkDegrees(ctx.message.text)
        if (degrees != Degrees.incorrect) {
            user.form.degrees = degrees
            saveUser(user)
            let replyText =
                '2/5. Укажите, какое количество товара понадобится?'
            ctx.reply(replyText, {
                reply_markup: {
                    keyboard: [
                        [ { text: 'До 100' }, { text: 'От 100' } ],
                        [ { text: 'От 300' }, { text: 'От 500' } ],
                        [ { text: 'От 1000' }, { text: 'От 4000' } ]
                    ],
                    resize_keyboard: true
                }
            })
        } else {
            let replyText =
                '❌ Я не понял вас'
            ctx.reply(replyText)
        }   
    } else if (user.form.countRange == null) {
        let countRange = checkCountRange(ctx.message.text)
        if (countRange != CountRange.incorrect) {
            user.form.countRange = countRange
            saveUser(user)
            let replyText =
                '3/5. Потребуется ли доставка?'
            ctx.reply(replyText, {
                reply_markup: {
                    keyboard: [
                        [ { text: '🚚 Да' }, { text: '❌ Нет' } ]
                    ],
                    resize_keyboard: true
                }
            })
        } else { 
            let replyText =
               '❌ Я не понял вас'
            ctx.reply(replyText)
        }
    } else if (user.form.delivery == null) {
        let delivery = checkDelivery(ctx.message.text)
        if (delivery != Delivery.incorrect) {
            user.form.delivery = delivery
            saveUser(user)
            let replyText =
                '4/5. Укажите ваше имя и контактный номер телефона'
            ctx.reply(replyText, {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        } else {
            let replyText =
                '❌ Я не понял вас'
            ctx.reply(replyText)
        }
    } else if (user.form.contact == null) {
        user.form.contact = ctx.message.text 
        saveUser(user)
        let replyText = '5/5. Оплата'
        ctx.reply(replyText, {
            reply_markup: {
                keyboard: [
                    [ { text: '💰 Налично' }, { text: '💳 Безналично' } ]
                ],
                resize_keyboard: true
            }
        })
    } else if (user.form.payWay == null) {
        let payWay = checkPayWay(ctx.message.text)
        if (payWay != PayWay.incorrect) {
            user.form.payWay = payWay
            deleteUser(ctx.from.id)
            let replyText =
                '✅ Спасибо за заказ, с вами свяжутся в ближайшее время!'
            ctx.reply(replyText, {
                reply_markup: {
                    remove_keyboard: true
                }
            })
            ctx.telegram.sendMessage(process.env.ADMIN_ID, generateRequestText(user), {
                parse_mode: 'MarkdownV2'
            })
        } else {
            let replyText =
                '❌ Я не понял вас'
            ctx.reply(replyText)
        }
    } else {
        let replyText =
            '✅ Спасибо за заказ, с вами свяжутся в ближайшее время!'
        ctx.reply(replyText)
    }
}

