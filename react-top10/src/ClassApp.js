import React from 'react';

const MOCK_AVATAR = "https://i.pravatar.cc/100?img=";
const MOCK_API = "https://61c4962ef1af4a0017d99697.mockapi.io/users";

export default class ClassApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      users: [],
      error: null
    };
  }

  fetchUsers() {
    this.setState({ isLoading: true });
    fetch(MOCK_API)
        .then((response) => response.json())
        .then((data) =>
            this.setState({
              users: data.slice(0, 10),
              isLoading: false
            })
        )
        .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    setTimeout(() => this.fetchUsers(), 2000);
  }

  render() {
    const { isLoading, users, error } = this.state;
    return (
        <React.Fragment>
          <h1>Top 10 Users (using class component)</h1>
          <div class="users">
            {error ? <p>{error.message}</p> : null}
            {!isLoading ? (
                users.map((user, idx) => {
                  const { username, name, avatar } = user;
                  return (
                      <div>
                        <div className="flex">
                          <h1>{idx + 1}.</h1>
                          <div>
                            <img src={MOCK_AVATAR + `${idx}`} />
                            <p>{name}</p>
                          </div>
                        </div>
                        <hr />
                      </div>
                  );
                })
            ) : (
                <h3>Loading...</h3>
            )}
          </div>
        </React.Fragment>
    );
  }
}
