export function moneyConverter(number) {
    let result = "";
    let odd = 0;
    
    while (number > 1000) { 
        odd = number % 1000;
        result = "," + odd.toString().padStart(3, "0") + result;
        number = parseInt(number / 1000);
    }

    return number + result + "đ";
}