const btnEnviar = document.getElementById("btnEnviar")
btnEnviar.addEventListener("click", function(){
    
    const pegar_nome = document.getElementById("pegar_nome").value
    const pegar_email = document.getElementById("pegar_email").value
    const pegar_assunto = document.getElementById("pegar_assunto").value
    const pegar_msg = document.getElementById("pegar_msg").value

    if(pegar_nome == "" || pegar_email == "" || pegar_assunto == "" || pegar_msg == ""){
        alert("Ops! Faltou algum campo para o envio da mensagem.")
    }
    else{
        alert("Enviado com sucesso. nome: " + pegar_nome + 
        " email: " + pegar_email + " assunto: " + pegar_assunto + " mensagem " + pegar_msg)
    }
})