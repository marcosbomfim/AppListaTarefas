const menu_adicionar = document.querySelector('#adicionar')
    const menu_tarefas = document.querySelector('#tarefas')

    const view_adicionar = document.querySelector('#view_adicionar')
    const view_tarefas = document.querySelector('#view_tarefas')

    const menu_geral = document.querySelector('#menu_geral')    

    const btn_adicionar = document.querySelector('#btn_adicionar')



    menu_adicionar.addEventListener('click', function(){

        alterar_menu('adicionar')
    })

    menu_tarefas.addEventListener('click', function(){

        alterar_menu('tarefas')
        exibir_tarefas()
        
    })

    const c_hora = document.querySelector('#hora')//mascara de hora
    c_hora.addEventListener('keydown', function(event){

        
        if(event.target.value.length==5 && event.keyCode!=8){

            event.preventDefault()
        }

        if(event.target.value.length==2 && event.keyCode!=8){

            event.target.value+=':'
        }
    })

    let lista =[]

    c_info_adicionar = document.querySelector('#info_adicionar')

    btn_adicionar.addEventListener('click', function(){

        const c_desc = document.querySelector('#desc')
        const c_data = document.querySelector('#data')    
        const c_hora = document.querySelector('#hora') 
        const c_prio = document.querySelector('#prio')

        adicionar(c_desc, c_data, c_hora, c_prio)

    })

    function adicionar(c_desc, c_data, c_hora,c_prio){

        const array_campos = [c_desc, c_data, c_hora, c_prio]

        array_campos.forEach(elemento=>{

            elemento.style.borderColor='#ced4da'
        })

        camposVazios = validacao(array_campos)

        if(camposVazios.length==0) {

            let data_format = c_data.value
            obj = {}
            obj.descricao =c_desc.value
            obj.data =data_format
            obj.hora =c_hora.value
            obj.prio =c_prio.value

            lista.push(obj)

            n_tarefas_cadastradas()

            zerarCampos(array_campos)
            c_info_adicionar.style.color='green'
            c_info_adicionar.textContent='Adicionado com Successo!'
           
        }else{
            camposVazios.forEach(elemento=>{

                elemento.style.borderColor='red'
                
            })
            c_info_adicionar.style.color='red'
            c_info_adicionar.textContent='Verifique os campos!'
        }
    }

    function exibir_tarefas(){

        const dados_tabela = document.querySelector('#dados_tabela')

        dados_tabela.innerHTML=''

        if(lista.length==0){

            dados_tabela.innerHTML='<tr><td>Nenhuma tarefa cadastrada</td></tr>'

            return false
        }
        let inc=0

        ordenacao()

        lista.forEach(elemento=>{

            const tr_tabela = document.createElement('tr') 
            tr_tabela.id='tr_'+inc

            const td_desc = document.createElement('td')
            const td_data = document.createElement('td')
            const td_hora = document.createElement('td')
            const td_prio = document.createElement('td')
            const td_rm = document.createElement('td')
            td_desc.textContent=elemento.descricao
            const data_format =elemento.data.split('-')[2]+'/'+elemento.data.split('-')[1]+'/'+elemento.data.split('-')[0]
            td_data.textContent=data_format
            td_hora.textContent=elemento.hora
            td_prio.textContent=elemento.prio

            const cores = {'Baixa':'green', 'Média': 'orange', 'Alta':'red'}
            const prio = elemento.prio
            td_prio.style.color = cores[prio]

            td_rm.textContent='X'
            td_rm.style.color='red'
            td_rm.id=inc
            td_rm.style.cursor='pointer'
            td_rm.addEventListener('click', function(event){

                if(confirm('Deseja remover a tarefa?')==true){

                    const id_tr = event.target.id

                    const tr_rm =document.querySelector('#tr_'+id_tr)
                    tr_rm.remove()

                    const index = Number(id_tr.split('_')[1])

                    const index_lista = lista.indexOf(index)
                                                            
                    lista.splice(index_lista)

                    n_tarefas_cadastradas()
                }

                
            })

            tr_tabela.appendChild(td_desc)
            tr_tabela.appendChild(td_data)
            tr_tabela.appendChild(td_hora)
            tr_tabela.appendChild(td_prio)
            tr_tabela.appendChild(td_rm)

            dados_tabela.appendChild(tr_tabela)
            inc++
        })

       
    }

    function ordenacao(){ //array

       lista.sort(function(a, b){

            data_format1 = new Date(a.data+'T'+a.hora+':00')
            data_format2 = new Date(b.data+'T'+b.hora+':00')


            if(data_format1 < data_format2){

                return -1

            }else{

                return true
            }
       })
   
    }

    function validacao(campos){//array com os campos

        let camposVazios = []

        campos.forEach(elemento => {
            
            if(elemento.value==''){

                camposVazios.push(elemento)
                
            }
            if(elemento.id=='hora'){

               if(elemento.value.length<5){

                    camposVazios.push(elemento)
                }else{ 

                    const hora = elemento.value.split(':')

                    if(isNaN(hora[0]) || isNaN(hora[1])){

                        camposVazios.push(elemento)

                    }

                }
            }
             

        })
        return camposVazios
    }
    function zerarCampos(campos){

        campos.forEach(elemento=>{

            elemento.value=''
        })
    }

    function alterar_menu(view){

       

        if(view=='adicionar'){

            view_tarefas.className='display-none'
            view_adicionar.className='display-block'
            menu_adicionar.style.borderBottom='3px solid #495057'
            menu_tarefas.style.border=''
            menu_adicionar.style.order=1
            menu_tarefas.style.order=2

        }else{

            view_tarefas.className='display-block'
            view_adicionar.className='display-none'
            menu_tarefas.style.borderBottom='3px solid #495057'
            menu_adicionar.style.border='None'
            menu_tarefas.style.order=1
            menu_adicionar.style.order=2
        }

    }
    function n_tarefas_cadastradas(){

        const c_info_tarefa = document.querySelector('#info_tarefa')

        c_info_tarefa.textContent=`(${lista.length})`
    }
    

