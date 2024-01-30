import React from 'react';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Interactive Quizzes',
      description:
        'Engage in interactive quizzes to test your knowledge and learn in a fun way.',
    },
    {
      title: 'Personalized Learning',
      description:
        'Receive personalized learning recommendations based on your performance.',
    },
    {
      title: 'Progress Tracking',
      description:
        'Track your progress over time and see how you are improving.',
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
