"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var md_friendly_1 = require("./md_friendly");
var Degrees;
(function (Degrees) {
    Degrees[Degrees["incorrect"] = 0] = "incorrect";
    Degrees[Degrees["minus30"] = 1] = "minus30";
    Degrees[Degrees["minus20"] = 2] = "minus20";
    Degrees[Degrees["minus15"] = 3] = "minus15";
    Degrees[Degrees["minus10"] = 4] = "minus10";
})(Degrees || (Degrees = {}));
var CountRange;
(function (CountRange) {
    CountRange[CountRange["incorrect"] = 0] = "incorrect";
    CountRange[CountRange["below100"] = 1] = "below100";
    CountRange[CountRange["above100"] = 2] = "above100";
    CountRange[CountRange["above300"] = 3] = "above300";
    CountRange[CountRange["above500"] = 4] = "above500";
    CountRange[CountRange["above1000"] = 5] = "above1000";
    CountRange[CountRange["above4000"] = 6] = "above4000";
})(CountRange || (CountRange = {}));
var PayWay;
(function (PayWay) {
    PayWay[PayWay["incorrect"] = 0] = "incorrect";
    PayWay[PayWay["cash"] = 1] = "cash";
    PayWay[PayWay["cashless"] = 2] = "cashless";
})(PayWay || (PayWay = {}));
var Delivery;
(function (Delivery) {
    Delivery[Delivery["incorrect"] = 0] = "incorrect";
    Delivery[Delivery["with"] = 1] = "with";
    Delivery[Delivery["without"] = 2] = "without";
})(Delivery || (Delivery = {}));
var checkDegrees = function (value) {
    if (value == '-30')
        return Degrees.minus30;
    else if (value == '-20')
        return Degrees.minus20;
    else if (value == '-15')
        return Degrees.minus15;
    else if (value == '-10')
        return Degrees.minus10;
    else
        return Degrees.incorrect;
};
var checkCountRange = function (value) {
    value = value.toLowerCase();
    if (value == 'до 100')
        return CountRange.below100;
    else if (value == 'от 100')
        return CountRange.above100;
    else if (value == 'от 300')
        return CountRange.above300;
    else if (value == 'от 500')
        return CountRange.above500;
    else if (value == 'от 1000')
        return CountRange.above1000;
    else if (value == 'от 4000')
        return CountRange.above4000;
    else
        return CountRange.incorrect;
};
var checkDelivery = function (value) {
    value = value.toLowerCase();
    if (value.includes('да'))
        return Delivery["with"];
    else if (value.includes('нет'))
        return Delivery.without;
    else
        return Delivery.incorrect;
};
var checkPayWay = function (value) {
    value = value.toLowerCase();
    if (value.includes('безнал'))
        return PayWay.cashless;
    else if (value.includes('нал'))
        return PayWay.cash;
    else
        return PayWay.incorrect;
};
var getUser = function (id) {
    try {
        return JSON.parse(fs.readFileSync('users/' + id, 'utf8'));
    }
    catch (e) {
        return null;
    }
};
var saveUser = function (user) { return fs.writeFileSync('users/' + user.id, JSON.stringify(user)); };
var deleteUser = function (id) { return fs.unlinkSync('users/' + id); };
var readDegrees = function (degrees) {
    if (degrees == Degrees.minus30)
        return '-30';
    else if (degrees == Degrees.minus20)
        return '-20';
    else if (degrees == Degrees.minus15)
        return '-15';
    else if (degrees == Degrees.minus10)
        return '-10';
};
var readCountRange = function (countRange) {
    if (countRange == CountRange.below100)
        return 'До 100';
    else if (countRange == CountRange.above100)
        return 'От 100';
    else if (countRange == CountRange.above300)
        return 'От 300';
    else if (countRange == CountRange.above500)
        return 'От 500';
    else if (countRange == CountRange.above1000)
        return 'От 1000';
    else if (countRange == CountRange.above4000)
        return 'От 4000';
};
var readDelivery = function (delivery) {
    if (delivery == Delivery["with"])
        return 'требуется';
    else if (delivery == Delivery.without)
        return 'не требуется';
};
var readPayWay = function (payWay) {
    if (payWay == PayWay.cash)
        return 'наличными';
    else if (payWay == PayWay.cashless)
        return 'безначиный';
};
var generateRequestText = function (user) {
    var text = '[Пользователь](tg://user?id=' + user.id + ')\n';
    text += md_friendly_1["default"]('Имя, номер: ' + user.form.contact + '\n' +
        'Градус: ' + readDegrees(user.form.degrees) + '\n' +
        'Количество: ' + readCountRange(user.form.countRange) + '\n' +
        'Доставка: ' + readDelivery(user.form.delivery) + '\n' +
        'Метод оплаты: ' + readPayWay(user.form.payWay));
    return text;
};
exports["default"] = (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var replyText, user, replyText, replyText, degrees, replyText, replyText, countRange, replyText, replyText, delivery, replyText, replyText, replyText, payWay, replyText, replyText, replyText;
    return __generator(this, function (_a) {
        if (!ctx.message.text) {
            replyText = '❌ Я не понял вас';
            ctx.reply(replyText);
            return [2 /*return*/];
        }
        user = getUser(ctx.from.id);
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
            });
            replyText = '👋 Приветствую, Вы находитесь на боте сайта незамерзайка.москва\n' +
                'Для быстрого заказа ответьте на несколько вопросов. Обычно это занимает меньше минуты!';
            ctx.reply(replyText, {
                reply_markup: {
                    keyboard: [
                        [{ text: '👉 Приступить' }]
                    ],
                    resize_keyboard: true
                }
            });
            return [2 /*return*/];
        }
        if (user.form.contact == null && ctx.message.text.includes('Приступить')) {
            replyText = '1/5. Какой градус незамерзайки вас интересует?';
            ctx.reply(replyText, {
                reply_markup: {
                    keyboard: [
                        [{ text: '-30' }, { text: '-20' }],
                        [{ text: '-15' }, { text: '-10' }]
                    ],
                    resize_keyboard: true
                }
            });
        }
        else if (user.form.degrees == null) {
            degrees = checkDegrees(ctx.message.text);
            if (degrees != Degrees.incorrect) {
                user.form.degrees = degrees;
                saveUser(user);
                replyText = '2/5. Укажите, какое количество товара понадобится?';
                ctx.reply(replyText, {
                    reply_markup: {
                        keyboard: [
                            [{ text: 'До 100' }, { text: 'От 100' }],
                            [{ text: 'От 300' }, { text: 'От 500' }],
                            [{ text: 'От 1000' }, { text: 'От 4000' }]
                        ],
                        resize_keyboard: true
                    }
                });
            }
            else {
                replyText = '❌ Я не понял вас';
                ctx.reply(replyText);
            }
        }
        else if (user.form.countRange == null) {
            countRange = checkCountRange(ctx.message.text);
            if (countRange != CountRange.incorrect) {
                user.form.countRange = countRange;
                saveUser(user);
                replyText = '3/5. Потребуется ли доставка?';
                ctx.reply(replyText, {
                    reply_markup: {
                        keyboard: [
                            [{ text: '🚚 Да' }, { text: '❌ Нет' }]
                        ],
                        resize_keyboard: true
                    }
                });
            }
            else {
                replyText = '❌ Я не понял вас';
                ctx.reply(replyText);
            }
        }
        else if (user.form.delivery == null) {
            delivery = checkDelivery(ctx.message.text);
            if (delivery != Delivery.incorrect) {
                user.form.delivery = delivery;
                saveUser(user);
                replyText = '4/5. Укажите ваше имя и контактный номер телефона';
                ctx.reply(replyText, {
                    reply_markup: {
                        remove_keyboard: true
                    }
                });
            }
            else {
                replyText = '❌ Я не понял вас';
                ctx.reply(replyText);
            }
        }
        else if (user.form.contact == null) {
            user.form.contact = ctx.message.text;
            saveUser(user);
            replyText = '5/5. Оплата';
            ctx.reply(replyText, {
                reply_markup: {
                    keyboard: [
                        [{ text: '💰 Налично' }, { text: '💳 Безналично' }]
                    ],
                    resize_keyboard: true
                }
            });
        }
        else if (user.form.payWay == null) {
            payWay = checkPayWay(ctx.message.text);
            if (payWay != PayWay.incorrect) {
                user.form.payWay = payWay;
                deleteUser(ctx.from.id);
                replyText = '✅ Спасибо за заказ, с вами свяжутся в ближайшее время!';
                ctx.reply(replyText, {
                    reply_markup: {
                        remove_keyboard: true
                    }
                });
                ctx.telegram.sendMessage(process.env.ADMIN_ID, generateRequestText(user), {
                    parse_mode: 'MarkdownV2'
                });
            }
            else {
                replyText = '❌ Я не понял вас';
                ctx.reply(replyText);
            }
        }
        else {
            replyText = '✅ Спасибо за заказ, с вами свяжутся в ближайшее время!';
            ctx.reply(replyText);
        }
        return [2 /*return*/];
    });
}); });
