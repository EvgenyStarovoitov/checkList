import React from 'react';
import Type from 'prop-types';
import fetch from 'node-fetch';
import config from '../../config.json';

import './App.css';

import Button from 'arui-feather/button';

import Info from './info/index';
import CommentForm from './commentForm/index';
import AttachedFiles from './attachedFiles/index';
import TextMessage from './textMessage/index';
import { Grid } from 'react-flexbox-grid';

export default class App extends React.Component {
  static propTypes = {
    idmsg: Type.string,
    message:Type.string,
    link:Type.string,
    handleShowMessage: Type.func
  };

  static defaultProps = {
    idmsg: '1c8773eec'
  };

  state = {
    idmsg:this.props.idmsg,
    date:'',
    destination: '',
    name: '',
    email: '',
    phone: '',
    message:'',
    files: [],
    link:'',
    showResponse: true,
    showCommentForm: false
  };

  componentWillMount() {
    fetch(`${config.UrlApi}${config.api.getMessage}${this.props.idmsg}`)
      .then(res => {
        if (res.status !== 200) {
          console.log(`Oooops some problem. Status code: ${res.status}`);
          return;
        }
        return res.json();
      })
      .then(json => {
        this.setState({
          date: this.convertDate(json.date),
          destination: json.destination,
          email:json.email,
          message:json.message,
          name:json.name,
          phone:json.phone
        });
        return json;
      })
      .catch(e => {
        console.log(e);
      });
    fetch(`${config.UrlApi}${config.api.getFiles}${this.props.idmsg}`)
      .then(res => {
        if (res.status !== 200) {
          console.log(`Oooops some problem. Status code: ${res.status}`);
          return;
        }
        return res.json();
      })
      .then(json => {
        this.setState({
          files: json
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillReceiveProps(nextProps) {
  }

  handleShowMessage = () => {
    this.setState({
      showResponse: !this.state.showResponse,
      showCommentForm: !this.state.showCommentForm
    });
  };

  convertDate = (date) => {
    const utcDate = new Date(date);

    return utcDate.toLocaleDateString('en-GB', config.dateOptions);
  };

  renderCheckList = () => {
    return (
      <Grid>
        <Info
          link={`${config.UrlApi}${config.api.getMessage}${this.props.idmsg}`}
          idmsg={this.state.idmsg}
          date={this.state.date}
          destination={this.state.destination}
          name={this.state.name}
          email={this.state.email}
          phone={this.state.phone}
        />
        <TextMessage
          message = {this.state.message}
        />
        <AttachedFiles
          files={this.state.files}
        />
        <Button
          onClick={this.handleShowMessage}
          width='available'
        >
          {!this.state.showCommentForm ? 'Добавить комментарий' : 'Скрыть'}
        </Button>
      </Grid>
    );
  };

  renderCommentForm = () => {
    return (
      <Grid>
        <CommentForm
          onClick={this.handleShowMessage}
        />
      </Grid>
    );
  };

  render() {
    return (
      <div className='App'>
        {this.state.showResponse ? this.renderCheckList() : ''}
        {this.state.showCommentForm ? this.renderCommentForm() : ''}
      </div>
    );
  }
}
