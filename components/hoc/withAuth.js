
import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

const namespace = 'http://localhost:3000/';

export default function (role) {
  return function (Component) {
    return class withAuth extends React.Component {

      static async getInitialProps(args) {
        const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);
        return { ...pageProps };
      }

      renderProtectedPage() {
        const { isAuthenticated, user } = this.props.auth;
        const userRole = user && user[`${namespace}role`];
        let isAuthorized = false;

        if (role) {
          if (userRole && userRole === role) { isAuthorized = true };
        } else {
          isAuthorized = true;
        }

        if (!isAuthenticated) {
          return (
            <BaseLayout {...this.props.auth} >
              <BasePage>
                <h1> You are not authenticated</h1>
              </BasePage>
            </BaseLayout>
          )
        } else if (!isAuthorized) {
          return (
            <BaseLayout {...this.props.auth} >
              <BasePage>
                <h1> You don't have access permission. </h1>
              </BasePage>
            </BaseLayout>
          )
        } else {
          return (<Component {...this.props} />)
        }
      }


      render() {
        return this.renderProtectedPage();
      }
    }
  }
}

