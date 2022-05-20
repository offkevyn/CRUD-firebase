import {save, getTasks, onGetTasks} from './DAO.js';

var path = window.location.pathname;

if(path == '/criar.html')
{
    
} else if(path == '/listar.html')
{
}

const form = document.getElementById("form_main");
    
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = form['ipt_nome'];
    const email = form['ipt_email'];
    save(nome.value, email.value);

    form.reset();
});


const listaItens = document.querySelector("#main_listar .lista");
window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getTasks();

    querySnapshot.forEach( doc => {
        console.log(doc.data());
        listaItens.innerHTML += 
        `
        <div class="item_lista">
            <div class="sub_item">
                <span>Nome:</span>
                ` + doc.data().nome + `
            </div>
            <div class="sub_item">
                <span>Email:</span>
                ` + doc.data().email + `
            </div>
            <div class="group_icons_acao">
                <div class="icon_acao edit"><i class="fa fa-pencil"></i></div>
                <div class="icon_acao delete"><i class="fa fa-trash"></i></div>
            </div>
        </div>
        `;
    });
});