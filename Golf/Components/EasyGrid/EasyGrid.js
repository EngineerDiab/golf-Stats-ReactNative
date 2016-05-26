
import {Container, Content, Header, Title, Icon} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import FullStrokeSlider from './Components/sliders/FullStrokeSlider';
import HalfStrokeSlider from './Components/sliders/HalfStrokeSlider';
import PutsSlider from './Components/sliders/PutsSlider';
import FirstPutSlider from './Components/sliders/FirstPutSlider';
import PenaltiesSlider from './Components/sliders/PenaltiesSlider';
var React = require('react');



class EasyGrid extends Component {
  render(){
    return(
      <Container>
        <Header>
          <Title>Hole 1</Title>
        </Header>
        <Content>
          <Grid>
            <Row>
              <Col>
                <FullStrokeSlider />
                <HalfStrokeSlider />
                <PutsSlider />
                <FirstPutSlider />
                <PenaltiesSlider />
              </Col>
            </Row>
            <Row>
              <Col style={{ backgroundColor: 'red'}}></Col>
              <Col style={{ backgroundColor: 'green'}}></Col>
              <Col style={{ backgroundColor: 'red'}}></Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

module.exports = EasyGrid;
