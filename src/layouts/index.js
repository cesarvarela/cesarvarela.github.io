import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './main.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Cesar Varela"
      meta={[
        { name: 'description', content: `Cesar Varela's website` },
        { name: 'keywords', content: `cesar, varela, frontend, developer` },
      ]}
    />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
