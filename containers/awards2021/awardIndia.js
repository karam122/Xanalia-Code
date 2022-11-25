import React from 'react'

class GiveAway extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <iframe
                    width="100%"
                    frameBorder="0"
                    className="giveaw"
                    src="https://www.noborderz.com/award-2021-simple/"
                ></iframe>
            </React.Fragment>
        )
    }
}

export default GiveAway
