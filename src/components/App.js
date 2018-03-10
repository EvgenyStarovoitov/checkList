import React from 'react';
import Type from 'prop-types';
import fetch from 'node-fetch';
import config from '../../config.json';
import { convertDate } from '../helpers/index';

import './App.css';

import Button from 'arui-feather/button';

import Info from './info/index';
import CommentForm from './commentForm/index';
import { Container, Row, Col } from './grid/index';
import AttachedFiles from './attachedFiles/index';
import TextMessage from './textMessage/index';

export default class App extends React.Component {
  static propTypes = {
    idmsg: Type.string,
    message:Type.string,
    link:Type.string,
    handleShowMessage: Type.func
  };

  static defaultProps = {
    idmsg: '1c8773eec'
  }

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
          date: convertDate(json.date),
          destination: json.destination,
          email:json.email,
          message:json.message,
          name:json.name,
          phone:json.phone
        });
        console.log(json);
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

  handleShowMessage = () => {
    this.setState({
      showResponse: !this.state.showResponse,
      showCommentForm: !this.state.showCommentForm
    });
  };

  renderCheckList = () => {
    return (
      <Container>
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
        <hr />
        <Row>
          <Col md={12} align='center'>
            <Button
              onClick={this.handleShowMessage}
              width='available'
            >
              {!this.state.showCommentForm ? 'Добавить комментарий' : 'Скрыть'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  renderCommentForm = () => {
    return (
      <Container>
        <CommentForm
          onClick={this.handleShowMessage}
        />
      </Container>
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
