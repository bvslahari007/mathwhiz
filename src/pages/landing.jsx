import { Features, Functions } from "../components/features.jsx";
import MathBackground from "../components/mathbackground.jsx";

import quadratic from "../assets/quadratic.png";
import cubic from "../assets/cubic.png";
import exponential from "../assets/exponential.png";
import meme from "../assets/meme.gif";

function Landing() {
  return (
    <div className="mathwhiz-page">
      <MathBackground />
      <header>
        <h1>MathWhiz</h1>
        <p>Explore. Visualize. Understand.</p>
      </header>

      <main>
        <img src={meme} alt="MathWhiz mathematics meme" className="hero-meme" />{" "}
        <section id="hero">
          <h1>Stop memorizing. Start exploring.</h1>

          <h3>
            What happens to a graph when you change an equation? Find out for
            yourself.
          </h3>

          <p>
            MathWhiz helps you understand mathematical functions through
            interactive graphs, adjustable parameters, and hands-on
            experimentation.
          </p>

          <button onClick="#">Start Visualizing</button>
        </section>
        <section id="features">
          <Features title="Visualize" descr="See equations come to life." />

          <Features title="Experiment" descr="Change parameters and explore." />

          <Features title="Save" descr="Keep your explorations." />
        </section>
        <section id="func-families">
          <h2>Explore Function Families</h2>

          <Functions
            src={quadratic}
            title="Quadratic Functions"
            descr="Explore parabolas and how coefficients affect their shape."
          />

          <Functions
            src={cubic}
            title="Cubic Functions"
            descr="Investigate curves, turning points, and shape."
          />

          <Functions
            src={exponential}
            title="Exponential Functions"
            descr="Understand exponential growth and decay visually."
          />
          <h3>many others coming soon...</h3>
        </section>
      </main>

      <footer>
        <h2>See the math. Understand the why.</h2>
        <p>Your next mathematical discovery starts with one equation.</p>
        <p>MathWhiz © 2026</p>
      </footer>
    </div>
  );
}

export default Landing;
