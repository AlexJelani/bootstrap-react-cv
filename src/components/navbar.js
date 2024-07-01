import React, { Component } from 'react';
import jelani from '../assets/img/jelaniprofilepic.jpeg';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class Navigate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_of_titles: [
                "about",
                "experience",
                "education",
                "skills",
                "interests",
                "blog"
            ],
        };
    }

    render() {
        const titles = this.props.titles.map((title, index) => (
            <Container style={{ paddingRight: 0, marginRight: 0 }} className="nav-item justify-content-end" key={index}>
                <Nav.Link
                    as={Link}
                    eventKey={index}
                    activeClass="active"
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                    spy={true}
                    to={this.props.hrefs[index]}
                    smooth={"easeInOutQuart"}
                    duration={1500}
                >
                    {title}
                </Nav.Link>
            </Container>
        ));
        return (
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav" collapseOnSelect expand="lg" bg="dark" variant="dark">
                {/*<BootstrapSwitchButton*/}
                {/*    checked={false}*/}
                {/*    onlabel='Eng'*/}
                {/*    offlabel='JP'*/}
                {/*    size="lg"*/}
                {/*    onstyle="dark"*/}
                {/*    offstyle="light"*/}
                {/*    onChange={() => {*/}
                {/*        this.props.handleSwitch();*/}
                {/*    }}*/}
                {/*/>*/}
                <button className="navbar-brand" onClick={() => scroll.scrollToTop()} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <span className="d-none d-lg-block">
                        <img className="img-fluid img-profile rounded-circle mx-auto mb-2" style={{ cursor: "pointer" }} src={jelani} alt="" />
                    </span>
                </button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {titles}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigate;
