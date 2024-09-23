import React, { useContext } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaMinus, FaPlus, FaEquals} from "react-icons/fa6";
import { LuDivide } from "react-icons/lu";
import { TbLetterX } from "react-icons/tb"
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import maxNumbers from "../../../utils/maxNumbers";
import clear from "../../../utils/clear";
import remove from "../../../utils/remove";
import calculation from "../../../utils/calculation";
import intoPercent from "../../../utils/intoPercent";
import { ValuesContext } from "../../../context";

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
    const signsCheck = (signs.includes(valueToShow.at(valueToShow.length - 2)) && signs.includes(valueToShow.at(valueToShow.length - 1))) || signs.includes(valueToShow.at(valueToShow.length - 1))
    const zeroCheck = valueToShow === '0' || valueToShow === ''

    const storedExpressions = (result) => {
        if(result === '0' || undefined) return 
        setStoredExp([...storedExp, result])
    }

    const numberCheck = (event) => {
        return valueToShow === '0' ? event.target.innerHTML : valueToShow + event.target.innerHTML
    }

    const failure = (sign) => {
        if(sign === '.') return signs.includes(valueToShow.at(valueToShow.length - 1)) ? valueToShow : valueToShow + '.'
            return signsCheck ? valueToShow : valueToShow + sign
    } 

    const dotCheck = (callback) => {
        const stringCheck = valueToShow.slice(-(counter))
        return stringCheck.includes('.') ? setValueToShow(valueToShow) : setValueToShow(callback)
    }

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
                        <div onClick={() =>  {
                            setValueToShow( signsCheck ? remove(valueToShow) : intoPercent(valueToShow, storedExpressions))
                            setCounter(valueToShow.length)
                            }}
                            >%</div>
                        <div onClick={() => {
                            setCounter(counter - 1)
                            setValueToShow(remove(valueToShow))
                        }}>
                            <FaLongArrowAltLeft />
                        </div>
                        <div onClick={() => {
                            setCounter(0)
                            setValueToShow(clear())
                        }}
                        >C</div>
                    </div>
                        <table className="numbers-content">
                            <tbody>
                            <tr className="numbers active">
                                <td onClick={(event) => {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >7</td>
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >8</td>

                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >9</td>
                            </tr>
                            <tr className="numbers active">
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >4</td>
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >5</td>
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >6</td>
                            </tr>
                            <tr className="numbers active">
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >1</td>
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >2</td>
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >3</td>
                            </tr>
                            <tr className="numbers active">
                                <td onClick={(event) =>  {
                                    setValueToShow( maxNumbers(counter) ? numberCheck(event) : valueToShow )
                                    setCounter(counter < 12 ? counter + 1 : 12) 
                                }}
                                >0</td>
                                <td onClick={() =>  {
                                    dotCheck( zeroCheck ? '0.' : failure('.'))
                                    setCounter(signsCheck ? counter : counter + 1) 
                                }}
                                >.</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="btns-right-content active">
                        <div className="btn-right" onClick={() =>  {
                            setCounter(signsCheck ? counter : 0)
                            setValueToShow( zeroCheck ? '0 ÷ ' : failure(' ÷ '))
                            }}>
                            <LuDivide />
                        </div>
                        <div className="btn-right" onClick={() =>  {
                            setCounter( signsCheck ? counter : 0)
                            setValueToShow( zeroCheck ? '0 * ' : failure(' * '))
                            }}>
                            <TbLetterX />
                        </div>
                        <div className="btn-right" onClick={() =>  {
                            setCounter(signsCheck ? counter : 0)
                            setValueToShow( zeroCheck ? '0 - ' : failure(' - '))
                            }}>
                            <FaMinus />
                        </div>
                        <div className="btn-right" onClick={() =>  {
                            setCounter(signsCheck ? counter : 0)
                            setValueToShow( zeroCheck ? '0 + ' : failure(' + '))
                            }}>
                            <FaPlus />
                        </div>
                        <div className="btn-right" onClick={() => {
                            setValueToShow( signsCheck ? remove(valueToShow) :  valueToShow === '' ? '0' : calculation(valueToShow, storedExpressions))
                            setCounter(valueToShow.length)
                        }}>
                            <FaEquals />
                        </div>
                    </div>  
                </main>
            </div>
    )
}

export default CalculatorContent