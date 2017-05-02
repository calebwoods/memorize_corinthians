import React, { Component } from 'react';
import { Link } from 'react-router';

class HelpPage extends Component {
  render() {
    return (
      <article className="wrapper">
        <Link to="/" className="back"><i className="fa fa-arrow-left"></i></Link>
        <h1>Help</h1>
        <a className="feedback" href=" https://vintage21.wufoo.com/forms/corinthians-feedback/" target="_blank">Feedback</a>

        <h3>WHAT IS THIS FOR?</h3>
        <p>
          Throughout 2017, we will be memorizing 1 Corinthians 13 as a church. This is a part of our larger churchwide effort, called <a href="http://vintagenc.com/live-2017/" target="_blank">Live 2017</a>. The church has a long history of memorizing verses, chapters, and even entire books of the bible for instruction and edification. We built this tool to assist with that edification through God's word.
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
          Use the Missing Word and Partial Text modes to help you recall the verse you just read.
        </p>
        <p>
          <span className="highlight">3. RECITE</span>
        </p>
        <p>
          The Recite mode gives you a textbox to enter the verse and check how close you are to memorizing.  You can type in this textbox or use voice to text on your phone (usually a <a href="http://www.imore.com/how-enable-use-and-disable-dictation-iphone-and-ipad" target="_blank">microphone button</a> on your keyboard). Do this until you feel like you've mastered the verse.
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
          <sup>3</sup>If I give away all I have, and if I deliver up my body to be burned, but have not love, I gain nothing.
        </blockquote>

        <h5>Missing Words</h5>
        <p>Missing word mode shows the entire text of the passage you are reviewing with a few words missing.</p>
        <blockquote>
          <sup>3</sup>If I give ____ all I have, ___ if I deliver __ my body to __ burned, but have ___ love, I gain _______.
        </blockquote>

        <h5>Partial Text</h5>
        <p>Partial text mode shows the first letter for each word in the text of the passage you are reviewing.</p>
        <blockquote>
          <sup>3</sup>I_ I g___ a___ a__ I h___, a__ i_ I d_____ u_ m_ b___ t_ b_ b_____, b__ h___ n__ l___, I g___ n______.
        </blockquote>

        <h5>Recite</h5>
        <p>Recite mode hides all of the text so that you can attempt to recall the entire verse yourself.</p>
        <blockquote>Recite 1 Corinthians 13:3</blockquote>
        <Link to="/" className="btn">Get Started</Link>
      </article>
    );
  }
}

export default HelpPage;
