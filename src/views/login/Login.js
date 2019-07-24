
import React, { useState, useEffect, useContext } from 'react';
import '../../Styles/login.css';
import JustReact from '../../assets/LogoJustReact.svg';
import WoombatLogo from '../../assets/LogoWoombat.svg';
import { Input, Button, Icon } from 'antd';
import Ajax from '../../assets/Ajax.svg';
import Background from '../../assets/bg.svg';
import { withRouter } from 'react-router-dom'
import fire from '../../FirebaseConfig/auth'
import Context from '../../GlobalState/context';

const Login = props => {

    const {state, actions} = useContext(Context)
    const [data, setData] = useState({ user: "", password: "" })
    const [user, setUser] = useState("")
    const [showLogin, setShowLogin] = useState(null)

    useEffect(() => {
        state.fire_init !== null ? authListener() : console.log("Loading...")
    })

    const login = () => {
        state.fire_init.auth().signInWithEmailAndPassword(data.user, data.password)
            .then(() => {
                setShowLogin(false)
                props.history.push('p_enpoint')
            })
            .catch(() => alert('Hubo un error, intente de nuevo'))
    }

    const authListener = () => {
        state.fire_init.auth().onAuthStateChanged(user => {


            if (user) {
                setUser(user)
                props.history.push('p_enpoint')

            } else {
                setShowLogin(true)
                setUser(null)

                // console.log("%c Signed Out ", "color: red; font-weight: bolder");
            }

        })
    }

    return (
        <React.Fragment>
            {
                showLogin ?
                    <div className="container-master">
                        <div className="background"><img src={Background}></img></div>
                        <div className="container-login">
                            <div className="login-modal">
                                <div className="frontend-logo-container">
                                    <img src={JustReact} className="frontend-logo"></img>
                                </div>
                                <div className="ajax-container">
                                    <img src={Ajax} className="ajax-logo"></img>
                                </div>
                                <div className="input-container">
                                    <p className="title-input">Correo Electronico:</p>
                                    <Input
                                        placeholder="Ingrese Correo"
                                        className="input-login"
                                        onChange={e => setData({ ...data, user: e.target.value })}
                                    />
                                </div>
                                <div className="input-container">
                                    <p className="title-input">Contraseña:</p>
                                    <Input
                                        placeholder="Ingrese Contraseña"
                                        type="password"
                                        className="input-login"
                                        onChange={e => setData({ ...data, password: e.target.value })}
                                    />
                                </div>
                                <div className="input-container">
                                    <Button
                                        type="primary"
                                        className="button-login"
                                        onClick={login}
                                    >
                                        <Icon type="login" /> Iniciar Sesion</Button>
                                </div>
                                <div className="container-copyright">
                                    <p className="text-copyright">Producto de</p>
                                    <a href="http://woombatcg.com/" target="_blank"><img src={WoombatLogo} className="woombat-logo"></img></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Button onClick={() => state.fire_init.auth().signOut()} type="primary"> Cerrar Sesion </Button>
            }
        </React.Fragment>
    )
}

export default withRouter(Login);