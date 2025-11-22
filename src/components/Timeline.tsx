import Link from 'next/link';
import { HiBadgeCheck } from 'react-icons/hi';

interface YearProps {
  children: React.ReactNode;
}

const Year = ({ children }: YearProps) => (
  <h4 className="text-dark dark:text-light mb-4 text-base font-medium md:text-lg">
    {children}
  </h4>
);

interface CheckpointProps {
  title: string;
  children?: React.ReactNode;
}

const Checkpoint = ({ title, children }: CheckpointProps) => (
  <>
    <div className="mb-1 flex items-start">
      <div className="mt-1 text-green-700 dark:text-green-300">
        <HiBadgeCheck className="h-5 w-5" />
      </div>
      <h5 className="text-dark dark:text-light ml-2 text-base font-medium">
        {title}
      </h5>
    </div>
    <li className="ml-2 border-l-2 border-solid border-gray-200 pb-4 last:border-0 last:pb-0 dark:border-gray-800">
      <p className="ml-5 text-base">{children}</p>
    </li>
  </>
);

const FullTimeline = () => (
  <div className="timeline text-gray-900 dark:text-gray-400">
    <Year>2023</Year>
    <ul>
      <Checkpoint title="Software Engineer III at Auzmor 🚀">
        Thrilled to continue my adventure as a <b>Software Engineer III</b> at
        Auzmor and looking forward to learning and growing even more!
      </Checkpoint>
    </ul>
    <Year>2022</Year>
    <ul>
      <Checkpoint title="MVP award 🎉">
        I was recognized for my performance at Auzmor and awarded the{' '}
        <b>Most Valuable Performer</b> award. It felt amazing to be appreciated
        for my hard work and dedication.
      </Checkpoint>
    </ul>
    <Year>2021</Year>
    <ul>
      <Checkpoint title="Software Engineer I at Auzmor">
        As a Software Engineer at <b>Auzmor</b>, I worked on the front-end side
        of Auzmor Learn, a Learning Management Solution.
      </Checkpoint>
      <Checkpoint title="Open Source ❤️">
        Started contributing to Open Source projects ❤️, particularly{' '}
        <Link
          href="https://github.com/kubernetes/website/pulls?q=author%3Aniteshseram+"
          aria-label="kubernetes contribution"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kubernetes
        </Link>{' '}
        docs. The experience was amazing and I learned so much about
        collaborating and contributing to a large project.
      </Checkpoint>
    </ul>
    <Year>2020</Year>
    <ul>
      <Checkpoint title="Starting a New Chapter 🚀">
        Joining Cognizant as a Programmer Analyst Trainee gave me my first taste
        of the tech industry and the chance to learn about Java Full Stack
        development. It was an incredible experience that helped me take my
        first steps on this exciting career path. 😎
      </Checkpoint>
      <Checkpoint title="Graduation 🧑‍🎓">
        Graduated 🎓 with a virtual convocation (thanks, pandemic!)
      </Checkpoint>
    </ul>
    <Year>2016</Year>
    <ul>
      <Checkpoint title="First step into the tech world 💻">
        Packed my bags and moved out of my hometown for the first time to start
        my journey in Assam Don Bosco University. Learning coding was
        challenging, but it was also exhilarating! 💻
      </Checkpoint>
    </ul>
    <Year>2015</Year>
    <ul>
      <Checkpoint title="Choosing My Path">
        I completed my higher secondary education and thought I wanted to be a
        doctor, but turns out engineering was the perfect fit! I&apos;m so happy
        I didn&apos;t get selected for med school, as it led me to my true
        passion. Now, every day is an exciting new adventure in the world of
        engineering! 🤖💥
      </Checkpoint>
    </ul>
    <Year>2013</Year>
    <ul>
      <Checkpoint title="The adventure of higher secondary began! 🎓" />
    </ul>
    <Year>1997</Year>
    <ul>
      <Checkpoint title="Birth of a Newbie 👶" />
    </ul>
  </div>
);

const Timeline = () => <FullTimeline />;

export default Timeline;
