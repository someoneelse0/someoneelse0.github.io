                        let d0=document.getElementById("qr")
                        let iqr=document.getElementsByClassName("iqr")[0].value
                        const b0=document.getElementsByClassName("b0")[0]
                        let oc=document.getElementsByClassName("oc")[0].value
                        let tc=document.getElementsByClassName("tc")[0].value
                        b0.addEventListener("click",(e)=>{
				document.getElementById("qqr").style.display="block"
                                if(oc=="" && tc==""){
                                        new QRCode(d0,{
                                                text:iqr,
                                                width:512,
                                                height:512,
                                                colorDark:"#000000ff",
                                                colorLight:"#ffffffff"
                                        })
                                }
                                else{
                                        new QRCode(d0,{
                                                text:iqr,
                                                width:512,
                                                height:512,
                                                colorDark:oc,
                                                colorLight:tc
                                        })
                                }
                        },false)
                        const b1=document.getElementsByClassName("b1")[0]
                        let itx=document.getElementsByClassName("itx")[0].value
                        let sec=document.getElementsByClassName("sec")[0].value
                        let txt1=document.getElementsByClassName("txt1")[0]
                        let txt2=document.getElementsByClassName("txt2")[0]
                        let txt3=document.getElementsByClassName("txt3")[0]
                        let txt4=document.getElementsByClassName("txt4")[0]
                        let txt5=document.getElementsByClassName("txt5")[0]
                        let txt6=document.getElementsByClassName("txt6")[0]
                        let txt7=document.getElementsByClassName("txt7")[0]
                        let txt8=document.getElementsByClassName("txt8")[0]
                        let txt9=document.getElementsByClassName("txt9")[0]
                        let argonText=document.getElementsByClassName("argonText")
                        let argonTimes=document.getElementsByClassName("argonTimes")
                        let argonType=document.getElementsByClassName("argonType")
                        let argonSal=document.getElementsByClassName("argonSal")
                        let argonMem=document.getElementsByClassName("argonMem")
                        let argonParallelism=document.getElementsByClassName("argonParallelism")
                        const b2=document.getElementsByClassName("b2")[0]
                        const b3=document.getElementsByClassName("b3")[0]
                        b1.addEventListener("click",(e)=>{
                                //e.preventDefault()
                                let tx1=CryptoJS.AES.encrypt(itx,sec).toString()
                                let tx2=CryptoJS.TripleDES.encrypt(itx,sec).toString()
                                let tx3=CryptoJS.SHA1(itx).toString()
                                let tx4=CryptoJS.SHA224(itx).toString()
                                let tx5=CryptoJS.SHA3(itx).toString()
                                let tx6=CryptoJS.SHA384(itx).toString()
                                let tx7=CryptoJS.SHA512(itx).toString()
                                txt1.innerHTML="AES: "+tx1
                                txt2.innerHTML="TRIPLEDES: "+tx2
                                txt3.innerHTML="SHA224: "+tx3
                                txt4.innerHTML="SHA256: "+tx4
                                txt5.innerHTML="SHA3: "+tx4
                                txt6.innerHTML="SHA384: "+tx4
                                txt7.innerHTML="SHA512: "+tx4
                                console.log("AES decrypt:",CryptoJS.AES.decrypt(tx1,sec).toString(CryptoJS.enc.Utf8))
                                console.log("TRIPLEDES decrypt:",CryptoJS.TripleDES.decrypt(tx2,sec).toString(CryptoJS.enc.Utf8))
                        },false)
                        var argonTpev=""
                        if(argonType[0].value=="2i"){argonTypev=argon2.ArgonType.Argon2i}
                        else if(argonType[0].value=="2d"){argonTypev=argon2.ArgonType.Argon2d}
                        else{argonTypev=argon2.ArgonType.Argon2id}
                        b2.addEventListener("click",(e)=>{
                                argon2.hash({
                                        pass:argonText[0].value,
                                        salt:argonSal[0].value,
                                        time:argonTimes[0].value,
                                        mem:argonMem[0].value,
                                        parallelism:argonParallelism[0].value,
                                        type:argonTypev
                                })
                                .then(res=>{
                                        txt8.innerHTML="res.hash: "+res.hash+"<br />res.hashHex: "+res.hashHex+"<br />res.encoded: "+res.encoded
                                })
                                .catch(err=>{
                                        console.error(err.message)
                                        console.error(err.code)
                                })
                        })
                        b3.addEventListener("click",(e)=>{
                                argon2.verify({
                                        pass:argonText[1].value,
                                        encoded:argonSal[1].value
                                })
                                .then(()=>{
                                        txt9.innerHTML="True"
                                })
                                .catch(err=>{
                                        txt9.innerHTML="False"
                                        console.error(err.message)
                                        console.error(err.code)
                                })
                        },false)
