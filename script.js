import { save } from './DAO.js';

const form = document.getElementById("form_main");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = form['ipt_nome'];
    const email = form['ipt_email'];
    save(nome.value, email.value);

    form.reset();
});