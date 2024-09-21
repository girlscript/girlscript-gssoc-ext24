import React from "react";
import { motion } from "framer-motion";
// import { Progress } from "../components/ui/progress"
// import Progress from "@radix-ui/react-progress";
import * as ProgressPrimitive from '@radix-ui/react-progress';

export default function ModuleList({ modules = [], onSelectModule }) {
    if (!modules || modules.length === 0) {
        return <div>No modules available</div>;
    }

    return (
        <div className="space-y-4">
            {modules.map((module) => (
                <motion.div
                    key={module.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 p-4 rounded-lg cursor-pointer"
                    onClick={() => onSelectModule(module)}
                >
                    <h3 className="text-xl font-semibold mb-2">
                        {module.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{module.description}</p>
                    {/* <Progress value={module.progress} className="w-full h-2" /> */}
                    <ProgressPrimitive.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3">
                        <ProgressPrimitive.Indicator
                        className="bg-blue-500 h-full"
                        style={{ width: `${module.progress}%` }}
                        />
                    </ProgressPrimitive.Root>
                    <p className="text-right text-sm text-gray-400 mt-2">
                        {module.progress}% complete
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
