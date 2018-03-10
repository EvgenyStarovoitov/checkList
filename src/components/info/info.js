import React from 'react';
import Type from 'prop-types';
import QRCode from 'qrcode';

import { Row, Col } from '../grid/index';

export default class Info extends React.Component {
  static propTypes = {
    link:Type.string,
    idmsg:Type.string,
    date:Type.string,
    destination:Type.string,
    name:Type.string,
    email:Type.string,
    phone:Type.string
  };

  static defaultProps = {
    link:'http://127.0.0.1:3001/',
    idmsg:'Some Id',
    date:'Some date',
    status:'Some date',
    destination:'Masons',
    name:'какой то паренек',
    email: 'гугл',
    phone: ' phone number'
  };

  componentDidMount() {
    this.renderQrcode();
  }

  renderQrcode = () => {
    if (this.props.link.length > 0) {
      const canvas = document.querySelector('.canvas__box');

      QRCode.toCanvas(canvas, this.props.link, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  };

  render() {
    return (
      <div className='info'>
        {/* <Row align='center'> */}
        <Col md={3} s={12} align='center'>
          <canvas className='canvas__box' />
        </Col>
        {/* </Row> */}
        {/* <Row> */}
        <Col md={9} s={12}>
          <Row>
            <Col md={4} s={5}>
              Обращение:
            </Col>
            <Col md={8} s={7}>
              {this.props.idmsg}
            </Col>
          </Row>
          <Row>
            <Col md={4} s={5}>
              Дата/Время:
            </Col>
            <Col md={8} s={7}>
              {this.props.date}
            </Col>
          </Row>
          <Row>
            <Col md={4} s={5}>
              Получатель:
            </Col>
            <Col md={8} s={7}>
              {this.props.destination}
            </Col>
          </Row>
          <Row>
            <Col md={4} s={5}>
              ФИО:
            </Col>
            <Col md={8} s={7}>
              {this.props.name}
            </Col>
          </Row>
          <Row>
            <Col md={4} s={5}>
              Email:
            </Col>
            <Col md={8} s={7}>
              {this.props.email}
            </Col>
          </Row>
          <Row>
            <Col md={4} s={5}>
              Телефон:
            </Col>
            <Col md={8} s={7}>
              {this.props.phone}
            </Col>
          </Row>
        </Col>
        {/* </Row> */}
      </div>
    );
  }
}
