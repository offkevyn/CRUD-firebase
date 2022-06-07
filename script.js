import {save, onGetTasks, deleteTask, updateTask} from './DAO.js';

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

    const fields = 
    {
        email: form['ipt_email'].value,
        nome: form['ipt_nome'].value,
        //dt_create: Date.now(),
        dt_last_update: "", 

    };

    save(fields);

    form.reset();
});

// -- Listar: Nesse aqui a lista não atualiza altomaticamnete ao fazer uma incersão, deletar ou atualizar

// const listaItens = document.querySelector("#main_listar .lista");
// var listaDados = [];
// window.addEventListener('DOMContentLoaded', async () => {
//     const querySnapshot = await getTasks();

//     querySnapshot.forEach( doc => {
//         console.log(doc.data())
//         var dados = {
//             email: doc.data().email,
//             nome: doc.data().nome,
//             id: doc.id
//         }
//         listaDados.push(dados);
//         listaItens.innerHTML += 
//         `
//         <div class="item_lista">
//             <div class="sub_item">
//                 <span>Nome:</span> 
//                 ${doc.data().nome}
//             </div>
//             <div class="sub_item">
//                 <span>Email:</span>
//                 ${doc.data().email}
//             </div>
//             <div class="group_icons_acao">
//                 <abbr title="Editar: ${doc.data().nome} "><div data-id="${doc.id}" class="icon_acao editar"><i data-id="${doc.id}" class="fa fa-pencil"></i></div></abbr>
//                 <abbr title="Deletar: ${doc.data().nome} "><div data-id="${doc.id}" class="icon_acao deletar"><i data-id="${doc.id}" class="fa fa-trash"></i></div></abbr>
//             </div>
//         </div>
//         `;
//     });

//     const list_btn_editar = document.getElementsByClassName('editar');
//     const list_btn_deletar = document.getElementsByClassName('deletar');
    
//     Array.from(list_btn_deletar).forEach(element => {
//         element.addEventListener('click', function (e)
//         {   
//             if(e.target.dataset.id != "undefined")
//             {
//                 mostrar_popup (popup_deletar, e.target.dataset.id);
//             }
//         });
//     });

//     Array.from(list_btn_editar).forEach(element => {
//         element.addEventListener('click', function (e)
//         {                       
//             if(e.target.dataset.id != "undefined")
//             {
//                 mostrar_popup (popup_editar, e.target.dataset.id);
//             }
//         });
//     });
// });

//Listar - Melhorado!
var listaItens = document.querySelector("#main_listar .lista");
var listaDados;
window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {  
        listaItens.innerHTML = ""; 
        listaDados = []; 
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            var dados = {
                email: doc.data().email,
                nome: doc.data().nome,
                id: doc.id
            }
            listaDados.push(dados);
            
            listaItens.innerHTML += 
            `
            <div class="item_lista id = "item_${doc.id}">
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

const ipt_edit_email = document.getElementById('ipt_edit_email');
const ipt_edit_nome = document.getElementById('ipt_edit_nome');

function mostrar_popup (popup_mosta, id)
{
    const elemento = listaDados.find(e => e.id === id);
    if(popup_mosta.id == "popup_editar")
    {//Editar
        ipt_edit_email.value = elemento.email;
        ipt_edit_nome.value = elemento.nome;
    }
    else if (popup_mosta.id == "popup_deletar")
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
    popup_mosta.style.margin = "0";
    popup_mosta.style.visibility = "visible";
    popup_mosta.dataset.id= id;
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

//Deletar
const btn_confirm_deleta = document.getElementById("btn_confirm_deleta");
btn_confirm_deleta.addEventListener('click', async (e) =>
{
    const id_delelete = popup_deletar.dataset.id;
    if(id_delelete)
    {
        ocultar_popup();
        try 
        {
            await deleteTask(id_delelete);
        } catch (error) 
        {
            console.log("Erro: " + error);
        }
    }
    else
    {
        //Erro
    }
});

//Editar
const btn_salvar_edit = document.getElementById("btn_salvar_edit");
btn_salvar_edit.addEventListener('click', async (e) =>
{
    const id_edit = popup_editar.dataset.id;
    if(id_edit)
    {
        ocultar_popup();
        try 
        {
            await updateTask(id_edit, 
                {
                    email: ipt_edit_email.value,
                    nome: ipt_edit_nome.value,
                });
        } catch (error) 
        {
            console.log("Erro: " + error);
        }
    }
    else
    {
        //Erro
    }
});