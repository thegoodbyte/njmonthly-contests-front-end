import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom';
import Super from './Super';
import SuperContests from './SuperContests';
import SuperContestsCreate from './SuperContestsCreate';
import SuperContestsContest from './SuperContestsContest';
import SuperContestsContestUpdate from './SuperContestsContestUpdate';
import SuperContestsContestEntries from './SuperContestsContestEntries';
import SuperContestsContestEntriesCreate from './SuperContestsContestEntriesCreate';
import SuperEntriesEntryUpdate from './SuperEntriesEntryUpdate';
import SuperContestsContestPages from './SuperContestsContestPages';
import SuperContestsContestPagesCreate from './SuperContestsContestPagesCreate';
import SuperContestsContestPagesPage from './SuperContestsContestPagesPage';
import SuperContestsContestForms from './SuperContestsContestForms';
import SuperFormsForm from './SuperFormsForm';
import SubscriptionsTable from './SubscriptionsTable';
import { connect } from 'react-redux';
import SuperHeader from './SuperHeader';

class Main extends Component {
  constructor(props){
    super(props);
    console.log('super props: ', this.props);
  }
  render() {

    return (
      <div>
        <Switch>
          <Route path='/super/contests/:contest' component={SuperHeader} />
          <Route path='/super/contests' component={SuperHeader} />
          <Route path='/super' component={SuperHeader} />
        </Switch>
        <main className="container super-admin" id="main-container">

        
          <Switch>

            <Route path='/super/contests/:contest/entries/create' component={SuperContestsContestEntriesCreate} />

            <Route path='/super/contests/:contest/entries' component={SuperContestsContestEntries} />

            <Route path='/super/contests/:contest/subscriptions-table' component={SubscriptionsTable} />

            <Route path='/super/contests/:contest/purchases-table' component={SubscriptionsTable} />

            <Route path='/super/contests/:contest/pages/create' component={SuperContestsContestPagesCreate} />

            <Route path='/super/contests/:contest/pages/:id' component={SuperContestsContestPagesPage} />

            <Route path='/super/contests/:contest/pages' component={SuperContestsContestPages} />

            <Route path='/super/contests/:contest/forms' component={SuperContestsContestForms} />

            <Route path='/super/contests/:contest/update' component={SuperContestsContestUpdate} />

            <Route exact path='/super/contests/create/:contest' component={SuperContestsCreate} />

            <Route path='/super/contests/:contest' component={SuperContestsContest} />

            <Route path={"/super/entries/:id"} component={SuperEntriesEntryUpdate} />

            <Route path='/super/contests' component={SuperContests} />

            <Route path='/super/forms/:id' component={SuperFormsForm} />

            <Route path='/super' component={Super} />

          </Switch>

        </main>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    contest: state.contest
  }
)

export default connect(mapStateToProps)(Main);