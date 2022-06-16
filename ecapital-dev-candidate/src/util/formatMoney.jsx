/**
 * util function: FormatMoney
 * 
 * input example: 12345
 * output example: $12,345
 *  
 */

function FormatMoney(str) {
    str -= 0;
    return str.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default FormatMoney
