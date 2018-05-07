

import React, { Component } from 'react'
import Helmet from 'react-helmet' // Lembrar do NPM install
// Serve para manipular o Head das páginas

export default class PerfilUsuario extends Component {
    render() {
        
        console.log(this.props.match.params.login)

        return (
            <div>
                <Helmet title={`Twitelum - ${this.props.match.params.login}`} />
                Oi
            </div>
        )
    }
}