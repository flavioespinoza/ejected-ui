import * as React from 'react';
import '@bit/flavioespinoza.exemplar-ui.css.material-dashboard-pro-react';
import '@bit/flavioespinoza.exemplar-ui.css.app';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@bit/flavioespinoza.exemplar-ui.button';
import CardQuick from '@bit/flavioespinoza.exemplar-ui.card-quick';
import Card from '@bit/flavioespinoza.exemplar-ui.card';
import selectStyles from '@bit/flavioespinoza.exemplar-ui.select-styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import DemoForm from 'views/HealthDemo/DemoForms/DemoForms';

const useStyles = makeStyles((theme) => {
  return {
    ...selectStyles(theme),
  };
});

function App() {
  const classes = useStyles();

  const title = 'Exemplar-UI Button';
  const subtitle = '@bit/flavioespinoza.exemplar-ui.button';
  const _handleClick = (e) => {
    console.log(e.target);
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
                component: (
                  <div>
                    <Button color="rose">Hello Exemplar</Button>
                  </div>
                ),
              }}
            />
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <DemoForm />
      </div>
    </section>
  );
}

export default App;
