import React from 'react';
import Type from 'prop-types';
// import fetch from 'node-fetch';

import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import Textarea from 'arui-feather/textarea';
import { default as IconClose  } from 'arui-feather/icon/ui/close';
import { Row, Col } from '../grid/index';

export default class CommentForm extends React.Component {
  static propTypes = {
    onClick:Type.func
  };

  static defaultProps = {
  };

  state = {
    comment: {
      name: '',
      note: ''
    }
  };

  handleName = (value) => {
    this.setState({ comment:{ ...this.state.comment, name: value } });
  };

  handleNote = (value) => {
    this.setState({ comment:{ ...this.state.comment, note: value } });
  };

  handleHideClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleSend = () => {

  };

  render() {
    return (
      <div className={'commentForm'}>
        <Row>
          <Col md={12}>
            <Input
              width='available'
              placeholder='Введите ваше имя'
              onChange={this.handleName}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Textarea
              name='message'
              width='available'
              placeholder='Ваше сообщение....'
              onChange={this.handleNote}
              autosize
              minRows={4}
              maxLength={8192}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button
              text='Отправить'
              onClick={this.handleSend}
            />
          </Col>
          {/* <Col md={6}>
            <Button
              text='Скрыть'
              onClick={this.handleHideClick}
            />
          </Col> */}
        </Row>
        <button
          className='commentForm__closeButton'
          onClick={this.handleHideClick}
        >
          <IconClose />
        </button>
      </div>
    );
  }
}
