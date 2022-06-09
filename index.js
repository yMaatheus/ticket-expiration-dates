const readlineSync = require('readline-sync');
const dayjs = require('dayjs');
const dayjsBusinessTime = require('dayjs-business-time');

dayjs.extend(dayjsBusinessTime);

const day = readlineSync.questionInt('Qual é o dia da data inicial?');
const month = readlineSync.questionInt('Qual é o mês da data inicial?');
const year = readlineSync.questionInt('Qual é o ano da data inicial?');
const months = readlineSync.questionInt('Quantos meses você quer adicionar?');

const getBusinessDate = (date) => dayjs(date).isBusinessDay() ? dayjs(date).format('YYYY-MM-DD') : dayjs(date).nextBusinessDay().format('YYYY-MM-DD');

const getTicketExpirationDate = (initialDate, months) => {
    const array = [getBusinessDate(initialDate)];
    for (let i = 1; i <= months; i++) {
        const currentDay = dayjs(initialDate).add(i, 'month').format('YYYY-MM-DD');
        array.push(getBusinessDate(currentDay));
    }
    return array;
}

console.log(getTicketExpirationDate(`${year}-${month}-${day}`, months));