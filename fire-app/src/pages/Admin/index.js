import { useState, useEffect } from 'react'
import './admin.css'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
 } from 'firebase/firestore'

export default function Admin(){

    const [tarefaInput, setTerefaInput] = useState('')
    const [user, setUser] = useState({})
    const [edit,setEdit] = useState({})

    const [tarefas, setTarefas] =useState([])

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail)

                const tarefaRef = collection(db,"tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid","==", data?.uid))
                const unsub = onSnapshot(q, (snapshot)=>{
                    let lista = []

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            tarefa:doc.data().tarefa,
                            userUid:doc.data().userUid
                        })
                    })

                    
                    setTarefas(lista)
                })
            }
        }

        loadTarefas()
    },[])

    async function handleRegister(e){
        e.preventDefault()

        if(tarefaInput === ""){
            alert("Digite sua tarefa")
            return
        }

        if(edit?.id){
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"),{
            tarefa:tarefaInput,
            created:new Date(),
            userUid:user?.uid
        })
        .then(()=>{
            alert("Tarefa registrada")
            setTerefaInput('')
        })
        .catch((error)=>{
            alert("Erro")
        })

    }

    async function handleLogout(){
        await signOut(auth)
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        
        await deleteDoc(docRef)
    }

    function editTarefa(item){
        setTerefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef,{
            tarefa: tarefaInput
        })
        .then(()=>{
            alert("Tarefa atualizada")
            setTerefaInput('')
            setEdit({})
        })
        .catch((error)=>{
            alert("Erro")
            setTerefaInput('')
            setEdit({})
        })
    }
    
    return(
        <div className="admin-conteiner">
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleRegister}>
                <textarea
                    placeholder="Digite sua terefa"
                    value={tarefaInput}
                    onChange={(e) =>setTerefaInput(e.target.value)}
                />

                { Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type='submit'>Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            
            </form>

           {
            tarefas.map((item)=>(
                <article key={item.id} className='list'>
                    <p>{item.tarefa}</p>

                    <div>
                        <button onClick={() => editTarefa(item)}>Editar</button>
                        <button onClick={() =>deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                    </div>
                </article>
            ))
           }


            <button className='btn-logout'onClick={handleLogout}>Sair</button>
        </div>
    )
}