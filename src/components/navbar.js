import React, { Component } from 'react';
import RetroHitCounter from 'react-retro-hit-counter';
import jelani from '../assets/img/jelaniprofilepic.jpeg';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

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
            hits: 0  // Initialize hits in state
        };
    }

    componentDidMount() {
        // Fetch hits count when component mounts
        fetch('https://jo9xko8ca7.execute-api.us-east-1.amazonaws.com/default/hit_counter')
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }))
            .catch(error => console.error('Error fetching hits:', error));
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
                <button className="navbar-brand" onClick={() => scroll.scrollToTop()} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <span className="d-none d-lg-block">
                        <img className="img-fluid img-profile rounded-circle mx-auto mb-2" style={{ cursor: "pointer" }} src={jelani} alt="" />
                    </span>
                </button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {titles}
                        {/* Put retro counter here */}
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <RetroHitCounter
                                hits={this.state.hits} // Use hits from state
                                withBorder={false}
                                withGlow={false}
                                minLength={4}
                                size={40}
                                padding={4}
                                digitSpacing={3}
                                segmentThickness={4}
                                segmentSpacing={0.5}
                                segmentActiveColor="#76FF03"
                                segmentInactiveColor="#315324"
                                backgroundColor="#222222"
                                borderThickness={7}
                                glowStrength={0.5}
                            />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
    }
    }

    export default Navigate;
