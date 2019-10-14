import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import selectStyles from '@bit/flavioespinoza.exemplar-ui.select-styles';
import Card from '@bit/flavioespinoza.exemplar-ui.card';
import CardQuick from '@bit/flavioespinoza.exemplar-ui.card-quick';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import request from 'request';
import log from 'ololog';

import SignupForm from '@bit/flavioespinoza.exemplar-ui.signup-form';

const useStyles = makeStyles((theme) => {
  return selectStyles(theme);
});

const DemoForms = ({ ...props }) => {
  const { ...prop } = props;
  const classes = useStyles();
  const [jsonProps, setJsonProps] = React.useState(null);
  const title = 'Basic Signup Form';
  const subtitle = 'Used for first time registration'

  const _handleClick = () => {
    let _json = JSON.stringify(props, null, 2);
    log.blue(_json);
    setJsonProps(_json);
  };

  const _openid = (qs) => {
    const origin = window.location.origin;
    const route = 'Route';
    const url = origin + '/api/' + route;
    const options = {
      method: 'POST',
      url: url,
      qs: qs,
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      const _body = JSON.parse(body);
      console.log(`route: url --> _body`, _body);
    });
  };

  return (
    <section className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={11} md={10}>
          <Card className={'authnet-card p24'}>
            <CardQuick
              {...{
                title: title,
                subtitle: subtitle,
                iconAwesome: true,
                icon: 'fad fa-address-card',
                color: 'info',
                component: <SignupForm />,
              }}
            />
          </Card>
        </GridItem>
      </GridContainer>
    </section>
  );
};

export default DemoForms;
