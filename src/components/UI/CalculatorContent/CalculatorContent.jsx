import React, { useContext } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaMinus, FaPlus, FaEquals} from "react-icons/fa6";
import { LuDivide } from "react-icons/lu";
import { TbLetterX } from "react-icons/tb"
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import maxNumbers from "../../../utils/maxNumbers";
import remove from "../../../utils/remove";
import calculation from "../../../utils/calculation";
import intoPercent from "../../../utils/intoPercent";
import { ValuesContext } from "../../../context";
import CustomButton from "../../CustomButton";

const CalculatorContent = () => {
    const {valueToShow, 
        setValueToShow, 
        storedExp, 
        setStoredExp, 
        counter, 
        setCounter, 
        visible, 
        setVisible
    } = useContext(ValuesContext)

    const text = 'Enter the number'
    const signs = ['÷', '*', '-', '+', '.', ' ', '%']
    const numbersFirstRow = [7, 8, 9]
    const numbersSecondRow = [4, 5, 6]
    const numbersThirdRow = [1, 2, 3]
    const numbersFourthRow = [0, '.']
    const buttonsRightArray = [{sign: '÷', component: <LuDivide />}, {sign: '*', component: <TbLetterX />}, {sign: '-', component: <FaMinus />}, {sign: '+', component: <FaPlus />}, {sign: '=', component: <FaEquals />}]
    const signsCheck = (signs.includes(valueToShow.at(valueToShow.length - 2)) && signs.includes(valueToShow.at(valueToShow.length - 1))) || signs.includes(valueToShow.at(valueToShow.length - 1))
    const zeroCheck = valueToShow === '0' || valueToShow === ''
    const signsZeroCheck = signsCheck ? counter : 0

    const storedExpressions = (result) => {
        if(result === '0' || undefined || "NaN") return 
        setStoredExp([...storedExp, result])
    }

    const numberCheck = (event) => {
        return valueToShow === '0' ? event.target.innerHTML : valueToShow + event.target.innerHTML
    }

    const signOperation = (sign) => {
        if(sign === '.') return signs.includes(valueToShow.at(valueToShow.length - 1)) ? valueToShow : valueToShow + '.'
        return signsCheck ? valueToShow.slice(0, valueToShow.length - 3) + sign : valueToShow + sign
    } 

    const dotCheck = (callback) => {
        const stringCheck = valueToShow.slice(-(counter))
        if(stringCheck.includes('.')){
            setValueToShow(valueToShow)
        } else {
            setValueToShow(callback)
        }
    }

    const handleNumbers = (count, dot) => (event) => {
        if(dot){
            dotCheck(zeroCheck ? '0.' : signOperation('.'))
            return
        }
        if(maxNumbers(count)){
            setValueToShow(numberCheck(event))
        } else {
            setValueToShow(valueToShow)
        }
        setCounter(count)
    }

    const percentCheck = () => {
        if(signsCheck) {
            return remove(valueToShow)
        } else {
            return intoPercent(valueToShow, storedExpressions)
        }
    } 
    const buttonsUpperArray = [{sign: '%', args: [valueToShow.length, percentCheck]}, {sign: <FaLongArrowAltLeft />, args: [counter - 1, remove(valueToShow)]}, {sign: 'C', args: [0, '0']}] 

    const equalsCheck = () => {
        console.log(signs.includes(valueToShow.at(valueToShow.length - 2)))
        if(signsCheck) {
            return remove(valueToShow)
        } 
        if(valueToShow === ''){
            return '0'
        } else {
            return calculation(valueToShow, storedExpressions)
        }
    }
    const zeroOperationValue = (sign) => zeroCheck ? `0 ${sign} ` : signOperation(` ${sign} `)

    const handleOperationButtons = (counter, showValue) => () => {
        setValueToShow( showValue )
        setCounter(counter)
    }
    
    const counterCheck = counter < 12 ? counter + 1 : 12
    
    return (
        <div className="calculator-content">
            <div className="stored-icon" onClick={() => setVisible(!visible)}>
                <PiClockCounterClockwiseFill />
            </div>
            <div className="results-area stored">{ storedExp.length < 1 ? 'Stored Expressions': storedExp[storedExp.length - 1]}</div>
            
            <hr />

            <div className="results-area value" >{valueToShow === "" ? <div style={{fontStyle: "italic"}}>{text}</div> : valueToShow}</div>

            <main>
                <div className="btns-upper active">
                    {buttonsUpperArray.map((el, index) => {
                        return <div onClick={handleOperationButtons(el.args[0], el.args[1])} key={index}>{el.sign}</div>
                    })}
                </div>
                    <table className="numbers-content">
                        <tbody>
                            <tr className="numbers firstrow active">
                                {numbersFirstRow.map((el, index) => {
                                    return <CustomButton number={el} onPress={handleNumbers(counterCheck)} key={index}/>
                                })}
                            </tr>
                            <tr className="numbers secondrow active">
                                {numbersSecondRow.map((el, index) => {
                                    return <CustomButton number={el} onPress={handleNumbers(counterCheck)} key={index}/>
                                })}
                            </tr>
                            <tr className="numbers thirdrow active">
                                {numbersThirdRow.map((el, index) => {
                                    return <CustomButton number={el} onPress={handleNumbers(counterCheck)} key={index}/>
                                })}
                            </tr>
                            <tr className="numbers fourthrow active">
                                {numbersFourthRow.map((el, index) => {
                                    if(el === '.') return <CustomButton number={el} onPress={handleNumbers(counterCheck, true)} key={index}/>
                                    return <CustomButton number={el} onPress={handleNumbers(counterCheck)} key={index}/>
                                })}
                            </tr>
                        </tbody>
                    </table>
                <div className="btns-right-content active">
                    {buttonsRightArray.map((el, index) => {
                        if(el.sign === '='){
                            return <div className="btn-right" onClick={handleOperationButtons(valueToShow.length, equalsCheck)} key={index}>
                                {el.component}
                            </div>
                        }
                        return <div className="btn-right" onClick={handleOperationButtons(signsZeroCheck, zeroOperationValue(`${el.sign}`))} key={index}>
                            {el.component}
                        </div>
                    })}
                </div>  
            </main>
        </div>
    )
}

export default CalculatorContent