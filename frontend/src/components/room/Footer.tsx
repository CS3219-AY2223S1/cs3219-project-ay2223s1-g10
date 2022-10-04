import { Card, CardContent, Button } from '@mui/material';
import { CircleRounded } from '@mui/icons-material';
import React from 'react';

export interface FooterProps {
  username: String;
  partnername: String;
  onLeave: () => void;
}

const Footer = ({ username, partnername, onLeave }: FooterProps) => (
  <Card className="relative bottom-0 inset-x-0">
    <CardContent className="flex align-middle border-2 boarder-gray-800">
      <div className="flex space-x-2 font-serif font-base text-lg w-full">
        {username ? (
          <div>
            <CircleRounded className="text-green-500" />
            {` ${username}`}
          </div>
        ) : null }
        {partnername ? (
          <div>
            <CircleRounded className="text-green-500" />
            {` ${partnername}`}
          </div>
        ) : null }
      </div>
      <Button variant="contained" className="float-right" size="small" onClick={onLeave}>Leave</Button>
    </CardContent>
  </Card>
);

export default Footer;