import {save, getTasks, onGetTasks} from './DAO.js';

var path = window.location.pathname;

if(path == '/criar.html')
{
    
} else if(path == '/listar.html')
{
}

//Criar
const form = document.getElementById("form_main");  
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = form['ipt_nome'];
    const email = form['ipt_email'];
    save(nome.value, email.value);

    form.reset();
});

//Listar
const listaItens = document.querySelector("#main_listar .lista");
var listaDados = [];
window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getTasks();

    querySnapshot.forEach( doc => {
        console.log(doc.data())
        var dados = {
            email: doc.data().email,
            nome: doc.data().nome,
            id: doc.id
        }
        listaDados.push(dados);
        listaItens.innerHTML += 
        `
        <div class="item_lista">
            <div class="sub_item">
                <span>Nome:</span> 
                ${doc.data().nome}
            </div>
            <div class="sub_item">
                <span>Email:</span>
                ${doc.data().email}
            </div>
            <div class="group_icons_acao">
                <abbr title="Editar: ${doc.data().nome} "><div data-id="${doc.id}" class="icon_acao editar"><i data-id="${doc.id}" class="fa fa-pencil"></i></div></abbr>
                <abbr title="Deletar: ${doc.data().nome} "><div data-id="${doc.id}" class="icon_acao deletar"><i data-id="${doc.id}" class="fa fa-trash"></i></div></abbr>
            </div>
        </div>
        `;
    });

    const list_btn_editar = document.getElementsByClassName('editar');
    const list_btn_deletar = document.getElementsByClassName('deletar');
    
    Array.from(list_btn_deletar).forEach(element => {
        element.addEventListener('click', function (e)
        {   
            if(e.target.dataset.id != "undefined")
            {
                mostrar_popup (popup_deletar, e.target.dataset.id);
            }
        });
    });

    Array.from(list_btn_editar).forEach(element => {
        element.addEventListener('click', function (e)
        {                       
            if(e.target.dataset.id != "undefined")
            {
                mostrar_popup (popup_editar, e.target.dataset.id);
            }
        });
    });
});

// PopUP
function ocultar_popup ()
{
    fundo_popup.style.visibility = "hidden";
    
    popup_editar.style.marginLeft = "-180vw";
    popup_editar.style.marginTop = "-150vh";
    popup_editar.style.visibility = "hidden";
    
    popup_deletar.style.marginLeft = "-180vw";
    popup_deletar.style.marginTop = "-150vh";
    popup_deletar.style.visibility = "hidden";
}

function mostrar_popup (e, id)
{
    const elemento = listaDados.find(e => e.id === id);
    if(e.id == "popup_editar")
    {//Editar
        const ipt_edit_email = document.getElementById('ipt_edit_email');
        const ipt_edit_nome = document.getElementById('ipt_edit_nome');

        ipt_edit_email.value = elemento.email;
        ipt_edit_nome.value = elemento.nome;
    }
    else if (e.id == "popup_deletar")
    {//Deletar
        const item_cofirm_deletar = document.querySelector('.popup .item_cofirm_deletar');

        item_cofirm_deletar.innerHTML = 
        `
        <div id="item_nome_deletar" class="sub_item">
            <span>Nome:</span>
            ${elemento.nome}
        </div>
        <div id="item_email_deletar" class="sub_item">
            <span>Email:</span>
            ${elemento.email}
        </div>
        `;
    }
    else
    {//ERRO
        return;
    }

    fundo_popup.style.visibility = "visible";
    e.style.margin = "0";
    e.style.visibility = "visible";
    e.dataset.id= id;
}

const fundo_popup = document.getElementById('fundo_popup');
const popup_editar = document.getElementById('popup_editar');
const popup_deletar = document.getElementById('popup_deletar');

fundo_popup.addEventListener('click', function (e)
{
   if (e.target == this) 
   {    
        ocultar_popup();
   }
}
);

