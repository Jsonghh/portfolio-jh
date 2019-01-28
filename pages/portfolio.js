import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import {withRouter} from 'next/router'
import axios from 'axios'
import BasePage from '../components/BasePage';



class Portfolio extends React.Component {
  // {query} is the object {post} from portfolios.js
  static async getInitialProps({query}) {
    const portfolioId = query.id
    let portfolio = {}
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${portfolioId}`)
      portfolio = response.data
    } catch(err) {
      console.error(err)
    }

    return {portfolio}
  }
	render() {
    const { portfolio } = this.props   
		return (

			<BaseLayout {...this.props.auth}>
        <BasePage>
          <h1> {portfolio.title} </h1>
          <p> ID: {portfolio.id} </p>
          <p> BODY: {portfolio.body} </p>
        </BasePage>
			</BaseLayout>
		)
	}
}

export default withRouter(Portfolio)