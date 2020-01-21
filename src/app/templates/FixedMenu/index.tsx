import React from 'react'
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

import config from 'app/config';

const imgSrc: string = `${config.publicUrl}/logo192.png`;

const FixedMenu: React.FC = ({ children }) => (
  <>
    <Menu fixed={`top`} inverted borderless>
      <Container>
        <Menu.Menu position={`left`}>
          <Menu.Item as={Link} header to={`/home`}>
            <Image
              size={`mini`}
              src={imgSrc}
              style={{ marginRight: '1.5em' }}
            />
            Project Dashboard
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position={`right`}>
          <Menu.Item header>
            <Button
              primary
              icon={`plus`}
              content={`Add Project`}
            />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>

    <Container style={{ marginTop: '3em' }}>
      { children }
    </Container>
  </>
);

export default FixedMenu;
