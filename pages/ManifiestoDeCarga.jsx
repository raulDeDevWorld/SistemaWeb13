import { useRouter } from 'next/router'
import Image from 'next/image'
import { useReducer, useState } from 'react'
import { useUser } from '../context/Context'
import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Card from '../components/Card'
import { getDayMonthYear } from "../utils/Fecha";



import style from '../styles/Manifesto.module.css'
import Button from '../components/Button'
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdfMC"), {
    ssr: false,
});

function CotizacionTerrestre() {
    const { user, pdfData, setUserPdfData } = useUser()
    const router = useRouter()

    const [calc, setCalc] = useState({})


    const [counter, setCounter] = useState({})

    const [data, setData] = useState({})
    const [tarifa, setTarifa] = useState([""])
    const [otrosGastos, setOtrosGastos] = useState([""])
    const [incluye, setIncluye] = useState([""])
    const [excluye, setExcluye] = useState([""])


    console.log(pdfData)

 function handleEventChange(e) {
        let data = { [`MC-${e.target.name}`]: e.target.value } 
        setUserPdfData({ ...pdfData, ...data, tarifa, otrosGastos, incluye, excluye })
    }
    function handlerCounter(word) {
        const newTarifa = tarifa.map(i => i)
        newTarifa.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa: [...tarifa, ...[""]], otrosGastos, incluye, excluye })
            setTarifa([...tarifa, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa: newTarifa, otrosGastos, incluye, excluye })
            setTarifa(newTarifa)
        }
    }
    function handlerCounterTwo(word) {
        const newOtrosGastos = otrosGastos.map(i => i)
        newOtrosGastos.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: [...otrosGastos, ...[""]],  incluye, excluye })
            setOtrosGastos([...otrosGastos, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: newOtrosGastos, incluye, excluye })
            setOtrosGastos(newOtrosGastos)
        }
    }
    function handlerCounterThree(word) {
        const newIncluye = incluye.map(i => i)
        newIncluye.pop()
        word == "pluss" ? setIncluye([...incluye, ...[""]]) : setIncluye(newIncluye)

        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos,  incluye: [...incluye, ...[""]], excluye })
            setIncluye([...incluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa,  otrosGastos, incluye: newIncluye, excluye })
            setIncluye(newIncluye)
        }
    }
    function handlerCounterFour(word) {
        const newExcluye = excluye.map(i => i)
        newExcluye.pop()
        word == "pluss" ? setExcluye([...excluye, ...[""]]) : setExcluye(newExcluye)
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos,  incluye, excluye: [...excluye, ...[""]]})
            setExcluye([...excluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa,  otrosGastos, incluye, excluye: newExcluye })
            setExcluye(newExcluye)
        }
    }


    function handlerPDFTester() {

        setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye })
    }
    function handlerCalc(e, index) {

        let data = {
            ...calc,
            [e.target.name]: e.target.value,
        }
        setCalc(data)
        let arr = Object.entries(data)
        console.log(data)

        let red = arr.reduce((ac, i) => {
            let str = i[0]

            console.log(ac)
            if (str.includes('CANTIDAD')) {
                return { ...ac, cantidad: ac && ac['cantidad'] && parseInt(ac['cantidad']) ? parseInt(ac['cantidad']) + parseInt(i[1]) : i[1] }
            }
            if (str.includes('PESO')) {
                return { ...ac, peso: ac && ac['peso'] && parseInt(ac['peso']) ? parseInt(ac['peso']) + parseInt(i[1]) : i[1] }
            }
            if (str.includes('VOLUMEN')) {
                return { ...ac, volumen: ac && ac['volumen'] && parseInt(ac['volumen']) ? parseInt(ac['volumen']) + parseInt(i[1]) : i[1] }
            }
        }, {})

        setCounter(red)

    }




    return (
        <Layout>
            <div className={style.container}>
                <form className={style.form}>
                    <div className={style.subtitle}>MANIFESTO DE CARGA</div>
                    <div className={style.containerFirstItems}>
                        <div className={style.imgForm}>
                            <Image src="/logo.svg" width="250" height="150" alt="User" />
                        </div>
                        <div className={style.firstItems}>
                            <div>
                                <h2 htmlFor="">MANIFESTO DE CARGA</h2>
                            </div>
                        </div>
                    </div>




                    <br />

                    <div className={style.items}>
                        <div>
                            <label htmlFor="">REMITENTE</label>
                        </div>
                        <div>
                            <label htmlFor="">MANISFESTO DE LA CARGA</label>
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 1"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 2"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 3"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 4"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 5"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <input type="text" name={"MANISFESTO 6"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 7"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <input type="text" name={"MANISFESTO 8"} onChange={handleEventChange} />
                        </div>



                        <div>
                            <label htmlFor="">CONSIGNARIO</label>
                        </div>
                        <div>
                            <label htmlFor="">TRANSPORTADOR</label>
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 9"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 10"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 11"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 12"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 13"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <input type="text" name={"MANISFESTO 14"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"MANISFESTO 15"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <input type="text" name={"MANISFESTO 16"} onChange={handleEventChange} />
                        </div>
                    </div>
                    <br />


                    <br />
                    <div className={style.subtitle}>DATOS DEL TRANSPORTISTA</div>
                    <br />
                    <div className={`${style.items} ${style.newStyle}`}>
                        <div>
                            <label htmlFor="">NOMBRE</label>
                            <input type="text" name={"NOMBRE"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">LICENCIA</label>
                            <input type="text" name={"LICENCIA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">CELULAR</label>
                            <input type="text" name={"CELULAR"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">PLACA</label>
                            <input type="text" name={"PLACA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">TIPO DE UNIDAD</label>
                            <input type="text" name={"TIPO DE UNIDAD"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <label htmlFor="">COLOR</label>
                            <input type="text" name={"COLOR"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">MARCA</label>
                            <input type="text" name={"MARCA"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <label htmlFor="">TRANSITO</label>
                            <input type="text" name={"TRANSITO"} onChange={handleEventChange} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={style.subtitle}>iNFORMACION DEL SERVICIO</div>
                    <br />
                    <div className={`${style.items} ${style.newStyle}`}>
                        <div>
                            <label htmlFor="">MERCANCIA</label>
                            <input type="text" name={"MERCANCIA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">TIPO DE CARGA</label>
                            <input type="text" name={"TIPO DE CARGA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">EMPAQUE</label>
                            <input type="text" name={"EMPAQUE"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">SERVICIO</label>
                            <input type="text" name={"SERVICIO"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">ORIGEN</label>
                            <input type="text" name={"ORIGEN"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <label htmlFor="">DESTINO</label>
                            <input type="text" name={"DESTINO"} onChange={handleEventChange} />
                        </div>

                    </div>
                    <br />

                    <div className={style.subtitle}>DESCRPCION DE LA CARGA<span className={style.counterPluss} onClick={() => handlerCounter('pluss')}>+</span> <span className={style.counterLess} onClick={() => handlerCounter('less')}>-</span></div>

                    <div className={`${style.containerFirstItems2} ${style.desktop}`}>
                        <span>Nº</span>
                        <span>ITEM</span>
                        <span>DESCRIPCION</span>
                        <span>MARCA Y/O PRESINTO</span>
                        <span>CANT</span>
                        <span>PESO (Kg)</span>
                        <span>VOLUMEN (M3)</span>
                        <span>DIRECCION DE ENTREGA</span>
                    </div>
                    {
                        tarifa.map((i, index) => {
                            return (
                                <div className={`${style.inputs}`} onChange={handleEventChange} key={index}>
                                    <input type="text" name={`N${index}`} en el onChange={handleEventChange}  placeholder="Nº" />
                                    <input type="text" name={`ITEM${index}`} onChange={handleEventChange} placeholder="ITEM" />
                                    <input type="text" name={`DESCRIPCION${index}`} onChange={handleEventChange} placeholder="DESCRIPCION" />
                                    <input type="text" name={`MARCA${index}`} en onChange={handleEventChange}  placeholder="MARCA Y/O PRESINTO" />
                                    <input type="number" name={`CANTIDAD${index}`} onChange={(e) => handlerCalc(e, index)} placeholder="CANTIDAD" />
                                    <input type="number" name={`PESO${index}`} onChange={(e) => handlerCalc(e, index)} placeholder="PESO (Kg)" />
                                    <input type="number" name={`VOLUMEN${index}`} onChange={(e) => handlerCalc(e, index)} placeholder="VOLUMEN (M3)" />
                                    <input type="text" name={`DIRECCION DE ENTREGA${index}`} onChange={handleEventChange}  placeholder="DIRECCION DE ENTREGA" />
                                </div>
                            )
                        })
                    }
                    <div className={`${style.inputs}`} >
                        <span className={style.total}>TOTAL</span>
                        <span className={style.span}>{counter && counter.cantidad && counter.cantidad}</span>
                        <span className={style.span}>{counter && counter.peso && counter.peso}</span>
                        <span className={style.span}>{counter && counter.volumen && counter.volumen}</span>
                    </div>
                    <br />




                    <br />



                    <div className={style.items}>
                        <div>
                            <span htmlFor="">DOCUMENTACION SOPORTE</span>
                        </div>
                        <div>
                            <span htmlFor="">iNSTRUCCIONES DEL TRANSPORTE</span>
                        </div>
                        <div>
                            <span htmlFor="">DOCUMENTO</span>
                            <span htmlFor="">NUMERO</span>
                        </div>
                        <div>
                            <input type="text" name={"INSTRUCCION1"} onChange={handleEventChange} />
                            <input type="text" name={"INSTRUCCION2"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"DOC1"} onChange={handleEventChange} />
                            <input type="text" name={"NUM1"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"INSTRUCCION3"} onChange={handleEventChange} />
                            <input type="text" name={"INSTRUCCION4"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <input type="text" name={"DOC2"} onChange={handleEventChange} />
                            <input type="text" name={"NUM2"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <input type="text" name={"INSTRUCCION5"} onChange={handleEventChange} />
                            <input type="text" name={"INSTRUCCION6"} onChange={handleEventChange} />
                        </div>
                    </div>
                    <br />




                    <div className={style.subtitle}>OBSERVACIONES EN ORIGEN</div>

                    <div className={style.inputsAll} >
                        <textarea type="text" name={"INCLUYE"}  onChange={handleEventChange}/>
                    </div>
                    <br />
                    <div className={style.subtitle}>OBSERVACIONES EN DESTINO</div>

                    <div className={style.inputsAll} >
                        <textarea type="text" name={"EXCLUYE"}  onChange={handleEventChange} />
                    </div>
                    <br />

                    <div className={style.inputsAll} >
                        <textarea type="text" name={"COMENTARIO"} />
                    </div>

<br />


                </form>
            </div>
            <InvoicePDF click={handlerPDFTester} />

            <br />
            <br />
        </Layout>
    )
}

export default WithAuth(CotizacionTerrestre)
