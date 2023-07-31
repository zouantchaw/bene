'use client';
import React, { useState } from 'react';
import Form from "@/components/form";

interface TeamMember {
  email: string;
}

const addTeamMember = async (teamMember: TeamMember): Promise<TeamMember> => {
  // Add code here to implement adding a new team member
  // This function should interact with your back-end service
  return teamMember;
}

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState("");

  const handleAddTeamMember = async () => {
    const newTeamMember: TeamMember = { email };
    const addedTeamMember = await addTeamMember(newTeamMember);
    setTeam(prevTeam => [...prevTeam, addedTeamMember]);
    setEmail("");
  }

  return (
    <div>
      <h2>Add Team Member</h2>
      <Form
        title="Team Member Email"
        description="Enter the email of the team member."
        helpText="Please enter a valid email."
        inputAttrs={{
          name: "email",
          type: "email",
          placeholder: "team@member.com",
          defaultValue: email,
        }}
        handleSubmit={setEmail}
      />
      <button type="button" onClick={handleAddTeamMember}>Add Team Member</button>
      {team.map((member, index) => (
        <div key={index}>
          <p>Email: {member.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Team;