import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';


class portfolioNew extends React.Component {

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className='portfolio-creat-page' title='Creat New Portfolio'>
          <Row>
            <Col md='6'>
              <PortfolioCreateForm />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(portfolioNew);