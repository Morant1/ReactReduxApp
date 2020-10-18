import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketService from '../services/socketService';
class _Chat extends Component {
  state = {
    typeMsg: '',
    msg: { from: this.props.loggedUser, txt: '' },
    msgs: [],
    topic: this.props.id
  };

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.state.topic);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('chat history', msgs => {
      this.setState({ msgs: msgs[this.state.topic] || []});

    })
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
  }

  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
  };


  sendMsg = ev => {
    ev.preventDefault();
    socketService.emit('chat newMsg', this.state.msg);
    this.setState({ msg: { ...this.state.msg, txt: '' }, typeMsg: '' });
  };

  msgHandleFocus = ev => {
    const typingMsg = `${this.state.msg.from} is typing...`;
    socketService.emit('typing Msg', typingMsg);
    this.setState({ typeMsg: typingMsg })
  }

  msgHandleBlur = ev => {
    const typingMsg = '';
    socketService.emit('typing Msg', typingMsg);
    this.setState({ typeMsg: typingMsg })
  }

  msgHandleChange = ev => {
    const { name, value } = ev.target;

    this.setState(prevState => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value
        }
      };
    });
  };

  render() {
    return (
      <div className="chat">
        <form onSubmit={this.sendMsg}>
          <input
            type="text"
            value={this.state.msg.txt}
            onChange={this.msgHandleChange}
            onFocus={this.msgHandleFocus}
            onBlur={this.msgHandleBlur}
            name="txt"
            autoComplete='off'
          />
          <button>Send</button>
        </form>
        {/* make it constant with min-height */}
        {this.state.typeMsg && <div>{this.state.typeMsg}</div>} 
        <ul style={{ padding: '0' }}>
          {this.state.msgs && this.state.msgs.map((msg, idx) => (

            <li style={{ listStyle: 'none', border: '1px solid lightgrey' }} key={idx}><span style={{ color: "lightblue" }}>{msg.from}</span>: {msg.txt}</li>
          ))}
        </ul>
        <hr />
            ESC FOR CLOSE
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.userReducer.loggedinUser.username
  }
}

export const Chat = connect(mapStateToProps)(_Chat)

