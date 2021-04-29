import React, {useState, useEffect} from "react";

export default function Users(e) {

    const [id, setId] = useState('');
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEditing] = useState(false);
    const [filter, setFilter] = useState(''); 
    const [pagini, setPagini] = useState(0); 
    const API = process.env.REACT_APP_API;
    const [usuarios, setUsers] = useState([]);
    
 

    useEffect( ()=> {
        const getUsers = async () => {
            const res = await fetch(`${API}/api/users`)
            const data = await res.json();
            setUsers(data)
        };
        getUsers();
    },[API]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/api/users`,{
                method : 'POST',
                headers :  {'content-Type' : 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password
                })},
                { mode: 'no-cors'}
            );
            const data = await res.json();
            console.log(await data);
        } 
        else {
            setEditing(false);
            const res = await fetch(`${API}/api/users/${id}`,{
                method : 'PUT',
                headers :  {'content-Type' : 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password
                })},
                { mode: 'no-cors'});
            const data = await res.json();
            console.log(await data);
        }
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/api/users`)
        const data = await res.json();
        setUsers(data)
        console.log(data)
    };

    const pagina = (idpag, e) => {
        console.log("pagina : ", idpag)
    }
    const anterior = () => {
        (pagini<7) ? setPagini(0): setPagini(pagini-7)
        console.log("anterior", pagini)
    }

    const siguiente = () => {
        var size = Object.keys(search(usuarios)).length;
        (pagini > size-7) ? setPagini(pagini): setPagini(pagini+7)
        console.log("siguiente", pagini, size)
    }
    const filtrar = (f) => {
        setFilter(f)
        console.log(filter)
    }

    function search(rows){
        return rows.filter(row => row['username'].toLowerCase().indexOf(filter) > -1)
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if (userResponse){
            const res = await fetch(`${API}/api/users/${id}`, {method: 'DELETE'});
            const data = await res.json();
            console.log(await data)
            await getUsers();
        }
    };
    const editUser = async (id) => {
        const res = await fetch(`${API}/api/user/${id}`, {method: 'GET'});
        const data = await res.json();
        setEditing(true);
        setId(id);
        setName(data['username']);
        setPassword(data['password']);
        setEmail(data['e-mail']);
        console.log(editing, id, username, password, email)
    };

    return ( 
        <div className = "row" >
            <div className = "col-md-4" >
                <form onSubmit= {handleSubmit} className = "card card-body" >
                    <div className="form-group">
                        <input type="text" 
                        onChange={e => setName(e.target.value)} 
                        value ={username}
                        className = "form control "
                        placeholder = "username"
                        autoFocus />
                    </div>
                    <div className="form-group">
                        <input type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value ={password}
                        className = "form control "
                        placeholder = "password" />
                    </div>
                    <div className="form-group">
                        <input type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value ={email}
                        className = "form control "
                        placeholder = "email"/>
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'UPDATE' : 'CREATE'} </button>
                </form> 
            </div> 
            <div className = "col-md-6" >
                <table className = "table table-sm table-bordered">            
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>e-mail</th>
                            <th>password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {search(usuarios).slice(pagini, pagini+7 ).map((user) => (
                        <tr key={user['id']}>
                            <td>{user['username']}</td>
                            <td>{user['e-mail']}</td>
                            <td>{(user['password']).substr(10,20)}</td>
                            <td className="text-right">
                                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group me-2" role="group" aria-label="First group">
                                        <button className="btn btn-sm btn-primary mb-1" onClick={()=> editUser(user['id'])}>
                                        <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger mb-1 ml-1" onClick={()=> deleteUser(user['id'])}>
                                        <i className="fa fa-trash"></i>
                                        </button>
                                </div>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table> 
                <nav aria-label="Page navigation example">  
                        <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                        <p className="btn btn-sm" onClick={anterior}>
                            Previous
                        </p>
                        </li>
                        <li className="page-item">
                        <p className="btn btn-sm " onClick={(e) => pagina("1", e)}>
                            1
                        </p>
                        </li>
                        <li className="page-item">
                        <p className="btn btn-sm " onClick={(e) => pagina("2", e)}>
                            2
                        </p>
                        </li>
                        <li className="page-item">
                        <p className="btn btn-sm " onClick={(e) => pagina("3", e)}>
                            3
                        </p>
                        </li>
                        <li className="page-item">
                        <p className="btn btn-sm" onClick={siguiente}>
                            Next
                        </p>
                        </li>
                        
                        <input type="text" 
                        onChange={e => filtrar(e.target.value)} 
                        value ={filter}
                        className = "form form-group"
                        placeholder = "filter"
                        autoFocus />
                         
                        </ul>
                    </nav>     
            </div>
        </div>
    )
}