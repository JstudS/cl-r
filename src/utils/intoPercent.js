const intoPercent = (valueToShow, storedExpressions) => {
    let res = `${(eval(valueToShow.replace(/ ÷ /g, '/'))) / 100}`
    storedExpressions(valueToShow)
    console.log(`VTS= ${valueToShow}, RES= ${res}`)
    return res === 'NaN' ? "0" : res
}

export default intoPercent