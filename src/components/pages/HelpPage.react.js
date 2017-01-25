import React, { Component } from 'react';
import { Link } from 'react-router';

class HelpPage extends Component {
  render() {
    return (
      <article className="wrapper">
        <Link to="/" className="back"><i className="fa fa-arrow-left"></i></Link>
        <h1>Help</h1>
        <a className="feedback" href="https://vintage21.wufoo.com/forms/ephesians-feedback/" target="_blank">Feedback</a>

        <h3>WHAT IS THIS FOR?</h3>
        <p>
          Throughout 2016, we will be memorizing Ephesians 1-3 as a church. This is a part of our larger churchwide effort, called <a href="http://vintagenc.com/know-2016/" target="_blank">Know 2016</a>. The church has a long history of memorizing verses, chapters, and even entire books of the bible for instruction and edification. We built this tool to assist with that edification through God's word.
        </p>

        <hr />

        <h3>HOW DO I USE THIS APP?</h3>

        <h5>Simple. There are four steps:</h5>
        <p>
          <span className="highlight">1. READ</span>
        </p>
        <p>
          Read the verse you want to memorize multiple times in Full Text mode (see explanation of text modes below). Reading in context and listening to verse audio will help.
        </p>
        <p>
          <span className="highlight">2. RECALL</span>
        </p>
        <p>
          Use the Partial Text mode to help you recall the verse you just read.
        </p>
        <p>
          <span className="highlight">3. RECITE</span>
        </p>
        <p>
          Say the verse out loud without any help in Recite mode (writing it down somewhere will also help). Do this until you feel like you've mastered the verse.
        </p>
        <p>
          <span className="highlight">4. REPEAT</span>
        </p>
        <p>
          Once you've memorized a verse, repeating any of the steps above will help jog your memory. Repeatedly reciting the verse out loud, along with other verses you've memorized around it, will help the most.
        </p>

        <hr />

        <h3>TEXT MODES</h3>

        <h5>Full Text</h5>
        <p>Full text mode shows the entire text of the passage you are reviewing.</p>
        <blockquote>
          <sup>3</sup>Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places,
        </blockquote>

        <h5>Partial Text</h5>
        <p>Partial text mode shows the entire text of the passage you are reviewing.</p>
        <blockquote>
          <sup>3</sup>B______ b_ t__ G__ a__ F_____ o_ o__ L___ J____ C_____, w__ h__ b______ u_ i_ C_____ w___ e____ s________ b_______ i_ t__ h_______ p_____,
        </blockquote>

        <h5>Recite</h5>
        <p>Recite mode hides all of the text so that you can attempt to recall the entire verse yourself.</p>
        <blockquote>Recite Ephesians 1:3</blockquote>
        <Link to="/" className="btn">Get Started</Link>
      </article>
    );
  }
}

export default HelpPage;
