import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  constructor() {
    super()

    this.state = {
      novoTweet: '',
      tweets: []
    }
    console.log('constructor')
    // this.adicionaTweet = this.adicionaTweet.bind(this)
  }

  
  adicionaTweet = (event) => {
    event.preventDefault()
    // console.log('Alo alo wbrazil')
    const novoTweet = this.state.novoTweet

    fetch('http://localhost:3001/tweets', {
        method: 'POST',
        body: JSON.stringify( { conteudo: novoTweet, login: 'omariosouto' } )
      })
      .then((infosDoRequest) => {
        // console.log('Deu certo?', )
        return infosDoRequest.json()
      }) 
      .then((dadosVindosDoServidor) => {
        console.log('dadosVindosDoServidor', dadosVindosDoServidor)

        this.setState({
          tweets: [dadosVindosDoServidor, ...this.state.tweets], // Spread Operator
          novoTweet: ''
        })
      })
  }
  componentWillMount() {
    console.log('willMount')
  }
  
  componentDidMount() {
    console.log('didMount')
    fetch('http://localhost:3001/tweets')
      .then((respostaDoServer) => {
        return respostaDoServer.json()
      })
      .then((tweetsDoServidor) => {
        this.setState({
          tweets: tweetsDoServidor
        })
      })
  }
  
  render() {
    console.log('render')
    return (
<Fragment>
    <Cabecalho usuario="@omariosouto" />
    <div className="container">
        <Dashboard>
            <Widget>
                <form className="novoTweet" onSubmit={this.adicionaTweet}>
                    <div className="novoTweet__editorArea">
                        <span
                          className={`
                            novoTweet__status
                            ${this.state.novoTweet.length > 140
                              ? 'novoTweet__status--invalido'
                              : ''
                            }
                          `}>

                          { this.state.novoTweet.length }/140
                        </span>
                        <textarea
                          onChange={ (event) => {
                            // this.state.novoTweet = event.target.value
                            // this.render()
                            this.setState({
                              novoTweet: event.target.value
                            })
                          } }
                          value={ this.state.novoTweet }
                          className="novoTweet__editor"
                          placeholder="O que está acontecendo?"></textarea>
                    </div>
                    <button
                        disabled={ this.state.novoTweet.length > 140  }
                        type="submit"
                        className="novoTweet__envia">Tweetar</button>
                </form>
            </Widget>
            <Widget>
                <TrendsArea />
            </Widget>
        </Dashboard>
        <Dashboard posicao="centro">
            <Widget>
                <div className="tweetsArea">
                    { this.state.tweets.length === 0
                      ? <strong>Vai la digita um tweet</strong>
                      : ''
                    }  
                    {
                      this.state.tweets.map( (tweet, index) =>
                      <Tweet key={index} texto={tweet.conteudo} tweetInfo={tweet} /> ) 
                    }
                </div>
            </Widget>
        </Dashboard>
    </div>
</Fragment>
    );
  }
}

export default App;
