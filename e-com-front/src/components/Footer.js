
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';

export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white box pt-4'>
       <Container>
        <Row>
          <Col>
            <h3>About Us</h3>
            <Link className='link' href="#">Aim</Link>
            <Link className='link' href="#">Vision</Link>
            <Link className='link' href="#">Testimonials</Link>
          </Col>
          <Col>
            <h3>Services</h3>
            <Link className='link' href="#">Writing</Link>
            <Link  className='link'href="#">Internships</Link>
            <Link className='link' href="#">Coding</Link>
            <Link className='link' href="#">Teaching</Link>
          </Col>
          <Col>
            <h3>Contact Us</h3>
            <Link className='link' href="#">Uttar Pradesh</Link>
            <Link className='link' href="#">Ahemdabad</Link>
            <Link className='link' href="#">Indore</Link>
            <Link className='link' href="#">Mumbai</Link>
          </Col>
          {/* <Col>
          <CardHeader>
            <h3>Social Media</h3>
            </CardHeader>
            <Link className='link' href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </Link>
            <Link className='link' href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </Link>
            <Link className='link' href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </Link>
            <Link className='link' href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </Link>
          </Col>
           */}
        </Row>
      </Container>
      <MDBContainer className='p-3 pb-0'>
        <h1>Social Media</h1>
        <section className='mb-3'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}